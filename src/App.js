import './App.css'
import { useState } from 'react'
import { create, CID, IPFSHTTPClient } from "ipfs-http-client";
import * as IPFS from 'ipfs-core'
import axios from 'axios'; 

const client = create({ url: "/ip4/127.0.0.1/tcp/5001" })


function App() {
  const [fileUrl, updateFileUrl] = useState(``)

  async function onChange(e) {
    const file = e.target.files[0];
    console.log(file)
    console.log(JSON.stringify(file));

    const formData = new FormData();
    formData.append("file", file);
    console.log(formData);
    console.log(JSON.stringify(formData));
    try {
      const resFile = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formData,
          headers: {
              'pinata_api_key': '6a5e18bc116ad0bbe4ab',
              'pinata_secret_api_key': '86be236933b9847e77e129a09fde30d2dcd16e39ecf68b8e5957a9a64dd3514a',
              "Content-Type": "multipart/form-data"
          },
      });
      const ImgHash = `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`;
      console.log(ImgHash); 
      //updateFileUrl(ImgHash);
    } catch (error) {
      console.log('Error uploading file: ', error)
    }  

    // const file = e.target.files[0]
    // try {
    // let ipfs = await IPFS.create({
    //   url: "https://api.pinata.cloud/psa",
    //   repo: 'file-path' + Math.random()
    // })
    // const { cid } = await ipfs.add(file)
    // const url = `https://gateway.pinata.cloud/ipfs/${cid.string}`
    // updateFileUrl(url)
    // console.log(url)
  //}
//     const file = e.target.files[0];
//     // const ipfs = await IPFS.create()
//     try {
//       console.log("de");
//       // const { cid } = await ipfs.add('Hello world')
// // console.info(cid)
//       const added = await client.add(file);
//       console.log("de");
//       const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      
      
//       updateFileUrl(url)
//       console.log(url);
//     } catch (error) {
//       console.log('Error uploading file: ', error)
//     }  
  }
  return (
    <div className="App">
      <h1>IPFS Example</h1>
      <input
        type="file"
        onChange={onChange}
      />
      {
        fileUrl && (
          <img src={fileUrl} width="600px" />
        )
      }
    </div>
  );
}

export default App