import React from 'react'
import { useSessionStorage } from './useStorage'

function Credentials() {
  const [proxyInfo, setProxyInfo] = useSessionStorage('proxy')

  return (
    <div>
      <h1>Client credentials grant flow</h1>
      <table className='table-auto'>
        <thead>
          <tr>
            <th>Parameter</th>
            <th>Required?</th>
            <th>Type</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>client_id</td>
            <td>Yes</td>
            <td>String</td>
            {/* <td>{proxyInfo.client_id}</td> */}
            <td></td>
          </tr>
          <tr>
            <td>client_secret</td>
            <td>Yes</td>
            <td>String</td>
            {/* <td>{proxyInfo.client_secret}</td> */}
            <td></td>
          </tr>
          <tr>
            <td>grant_type</td>
            <td>Yes</td>
            <td>String</td>
            {/* <td>{proxyInfo.grant_type}</td> */}
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default Credentials
