import React, { useContext } from 'react'
import { useSessionStorage } from './useStorage'

function ConnectionDetails() {
  const [proxyInfo, setProxyInfo] = useSessionStorage('proxy')

  return (
    <div>
      <h1>Authorize code grant flow</h1>
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
            <td>force_verify</td>
            <td>No</td>
            <td>Boolean</td>
            <td></td>
          </tr>
          <tr>
            <td>redirect_uri</td>
            <td>Yes</td>
            <td>URI</td>
            <td></td>
          </tr>
          <tr>
            <td>response_type</td>
            <td>Yes</td>
            <td>String</td>
            <td></td>
          </tr>
          <tr>
            <td>scope</td>
            <td>Yes</td>
            <td>String</td>
            <td></td>
          </tr>
          <tr>
            <td>state</td>
            <td>No</td>
            <td>String</td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default ConnectionDetails
