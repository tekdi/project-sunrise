import axios from 'axios'

export function fetchToken(
  authUrl: string,
  username: string,
  password: string
): Promise<any> {
  const params = new URLSearchParams()
  params.append('client_id', 'hasura-app')
  params.append('username', username)
  params.append('password', password)
  params.append('grant_type', 'password')
  params.append('client_secret', '4c5a1403-9088-4f36-b1dc-c1a2384d8ec2')

  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Access-Control-Allow-Origin': '*'
    }
  }

  return axios.post(authUrl, params, config).catch((e) => e)
}
