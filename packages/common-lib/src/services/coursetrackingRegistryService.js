import mapInterfaceData from './mapInterfaceData'
import { get, post, update as coreUpdate } from './RestClient'
import * as likeRegistryService from './likeRegistryService'
import * as commentRegistryService from './commentRegistryService'
import * as courseRegistryService from './courseRegistryService'
import moment from 'moment'

const interfaceData = {
  id: 'identifier',
  type: 'resourceType',
  name: 'name',
  courseId: 'identifier',
  mergeParameterWithDefaultValue: {
    source: 'diksha',
    startTime: moment().format('DD MMM YY'),
    endTime: moment().add(1, 'days').format('DD MMM YY'),
    certificate: 'certificate',
    status: 'status',
    date: moment().format('DD MMM YY')
  }
}

let only = Object.keys(interfaceData)

export const getAll = async ({ adapter, ...params } = {}, header = {}) => {
  let headers = {
    ...header,
    Authorization: 'Bearer ' + localStorage.getItem('token')
  }

  const result = await get(
    // process.env.REACT_APP_API_URL + '/coursetracking/search',
    process.env.REACT_APP_API_URL + '/course/' + adapter + '/search',
    // null,
    { params, headers }
  )
  if (result.data.data) {
    return await getDataWithCourse(result.data.data)
  } else {
    return []
  }
}

export const getOne = async (filters = {}, header = {}) => {
  let headers = {
    ...header,
    Authorization: 'Bearer ' + localStorage.getItem('token')
  }
  try {
    const result = await get(
      process.env.REACT_APP_API_URL + '/coursetracking/' + filters.id,
      {
        headers
      }
    )
    if (result?.data?.data) {
      const data = result?.data?.data[0]
        ? result?.data?.data[0]
        : result?.data?.data
      return await getDataWithCourseOne(data)
    } else {
      return {}
    }
  } catch {
    return {}
  }
}

export const getLikes = async (id) => {
  return await likeRegistryService.getAll({
    contextId: { eq: id },
    context: { eq: 'CourseTracking' },
    type: { eq: 'like' }
  })
}

export const getComments = async (id, filter = {}) => {
  return await commentRegistryService.getAll({
    contextId: { eq: id },
    context: { eq: 'CourseTracking' },
    ...filter
  })
}

const getDataWithCourse = async (data) => {
  return await Promise.all(
    data.map(async (item) => await getDataWithCourseOne(item))
  )
}

const getDataWithCourseOne = async (object) => {
  let courseData = {}
  const item = mapInterfaceData(object, interfaceData)
  if (item.courseId && item.source) {
    let resultData = { id: '' }
    if (['Read', 'Learn'].includes(item?.type)) {
      resultData = await courseRegistryService.getContent({
        id: item.courseId,
        adapter: item.source
      })
    } else {
      resultData = await courseRegistryService.getOne({
        id: item.courseId,
        adapter: item.source
      })
    }

    let { id, ...peops } = resultData
    courseData = peops
  }
  return {
    ...item,
    ...courseData,
    duration: moment
      .duration(
        moment(item.endTime, 'hh:ss').diff(moment(item.startTime, 'hh:ss'))
      )
      .asMinutes(),
    dueDate: item.endTime
  }
}
