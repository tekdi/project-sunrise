import React from 'react'
import { Box, Center, HStack, Stack, Input } from 'native-base'
import { useWindowSize } from './helper'
import IconByName from './IconByName'
import Loading from './Loading'
import { useNavigate } from 'react-router-dom'
import AudioAnalyser from 'react-audio-analyser'
import '../styles.module.css'
export default function SearchLayout({
  filters,
  minStringLenght,
  searchPlaceholder,
  notFoundMessage,
  imageUrl,
  children,
  search,
  setSearch,
  onCloseSearch
}) {
  const [width, Height] = useWindowSize()
  const [refSearchBar, setRefSearchBar] = React.useState({})
  const [status, setStatus] = React.useState('inactive')
  const [audioType, setAudioType] = React.useState('audio/wav')
  const [audioSrc, setAudioSrc] = React.useState('')
  const [recordedAudio, setRecordedAudio] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const navigate = useNavigate()

  const [recordedAudioBase64, setRecordedAudioBase64] = React.useState('')
  const [ai4bharat, setAi4bharat] = React.useState('')

  const ASR_REST_URLS = {
    en: 'https://asr-api.ai4bharat.org'
  }
  const controlAudio = (status) => {
    setStatus(status)
    setSearch('')
    console.log(status)
  }
  const audioProps = {
    audioType,
    // audioOptions: {sampleRate: 30000},
    status,
    audioSrc,
    timeslice: 1000, // timeslice
    startCallback: (e) => {
      setAudioSrc('')
      setRecordedAudio('')
      console.log('succ start', e)
    },
    pauseCallback: (e) => {
      console.log('succ pause', e)
    },
    stopCallback: (e) => {
      let temp_audioSrc = window.URL.createObjectURL(e)

      setAudioSrc(temp_audioSrc)
      setRecordedAudio(temp_audioSrc)
      setLoading(true)
      let samplingrate = 30000
      if (temp_audioSrc !== '') {
        let uri = temp_audioSrc
        var request = new XMLHttpRequest()
        request.open('GET', uri, true)
        request.responseType = 'blob'
        request.onload = function () {
          var reader = new FileReader()
          reader.readAsDataURL(request.response)
          reader.onload = function (e) {
            // console.log('DataURL:', e.target.result)
            var base64Data = e.target.result.split(',')[1]
            setRecordedAudioBase64(base64Data)

            var myHeaders = new Headers()
            myHeaders.append('Content-Type', 'application/json')
            var payload = JSON.stringify({
              config: {
                language: {
                  sourceLanguage: 'en'
                },
                transcriptionFormat: {
                  value: 'transcript'
                },
                audioFormat: 'wav',
                samplingRate: samplingrate,
                postProcessors: null
              },
              audio: [
                {
                  audioContent: base64Data
                }
              ]
            })
            var requestOptions = {
              method: 'POST',
              headers: myHeaders,
              body: payload,
              redirect: 'follow'
            }
            const apiURL = `${ASR_REST_URLS['en']}/asr/v1/recognize/en`
            fetch(apiURL, requestOptions)
              .then((response) => response.text())
              .then((result) => {
                var apiResponse = JSON.parse(result)
                console.log(apiResponse['output'][0]['source'])
                setAi4bharat(
                  apiResponse['output'][0]['source'] != ''
                    ? apiResponse['output'][0]['source']
                    : '-'
                )
                setSearch(
                  apiResponse['output'][0]['source'] != ''
                    ? apiResponse['output'][0]['source']
                    : '-'
                )
                setLoading(false)
                // setStatus('inactive')
              })
          }
        }
        request.send()
      } else {
        setRecordedAudioBase64('')
      }

      console.log('succ stop', e)
    },
    onRecordCallback: (e) => {
      console.log('recording', e)
    },
    errorCallback: (err) => {
      console.log('error', err)
    }
  }

  React.useEffect(() => {
    setSearch('')

    getpermision()
  }, [])
  const getpermision = () => {
    navigator.getUserMedia =
      navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia ||
      navigator.msGetUserMedia
    navigator.getUserMedia(
      { audio: true },
      () => {
        console.log('Permission Granted')
        setAudioPermission(true)
      },
      () => {
        console.log('Permission Denied')
        setAudioPermission(false)
      }
    )
  }

  const onChangeSearch = (e) => {
    if (ai4bharat === '') {
      setSearch(e)
    } else {
      setSearch(ai4bharat)
    }
  }

  return (
    <Center>
      <Box minH={Height} w={width}>
        <Stack
          width={'100%'}
          style={{
            backgroundImage: imageUrl
              ? 'url(' + imageUrl + ')'
              : 'url(' + window.location.origin + '/header.png)',
            backgroundColor: 'transparent',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover'
          }}
          space={5}
          ref={(e) => setRefSearchBar(e)}
        >
          <HStack bg='white' space='1' alignItems='center' p='5'>
            <IconByName
              size='sm'
              name='ArrowLeftLineIcon'
              color='button.500'
              onPress={(e) => {
                if (onCloseSearch) {
                  onCloseSearch()
                } else {
                  navigate(-1)
                }
              }}
            />
            <Input
              flex='1'
              variant='unstyled'
              bg='gray.100'
              InputRightElement={
                <React.Fragment>
                  {status === 'recording' ? (
                    <IconByName
                      _icon={{ size: '23' }}
                      color='coolGray.500'
                      w='1/8'
                      name='StopLineIcon'
                      pl='0'
                      onPress={() => controlAudio('inactive')}
                    />
                  ) : (
                    <IconByName
                      _icon={{ size: '23' }}
                      color='coolGray.500'
                      w='1/8'
                      name='MicLineIcon'
                      pl='0'
                      onPress={() => controlAudio('recording')}
                    />
                  )}
                </React.Fragment>
              }
              value={search}
              onChange={(e) => onChangeSearch(e.target.value)}
              onPress={() => setSearch('')}
              placeholder={
                searchPlaceholder
                  ? searchPlaceholder
                  : `Type ${minStringLenght ? 'min ' + minStringLenght : ''}
                 to search `
                // ai4bharat ? ai4bharat : searchPlaceholder
              }
            />
          </HStack>
        </Stack>
        {loading ? <Loading /> : null}

        {search && (!minStringLenght || search.length >= minStringLenght) ? (
          children
        ) : (
          <Center
            minH={
              Height -
              (refSearchBar?.clientHeight ? refSearchBar?.clientHeight : 79)
            }
            w={width}
          >
            <Stack space='10' alignItems='center'>
              <IconByName
                _icon={{ size: '100' }}
                color='coolGray.200'
                w='1/8'
                name='FileSearchLineIcon'
                pl='0'
                onPress={(e) => setSearchInput(false)}
              />
              <Box _text={{ color: 'coolGray.300' }}>{notFoundMessage}</Box>
            </Stack>
          </Center>
        )}
      </Box>
      <Box display={'none'}>
        <AudioAnalyser {...audioProps} className='hide'>
          <div className='btn-box hide'>
            <br />
            <button
              className='btn'
              id='startaudio'
              onClick={() => this.controlAudio('recording')}
            >
              Start
            </button>
            <button
              className='btn'
              id='stopaudio'
              onClick={() => this.controlAudio('inactive')}
            >
              Stop
            </button>
          </div>
        </AudioAnalyser>
      </Box>
    </Center>
  )
}
