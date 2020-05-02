import React, { Component } from 'react'
import ListAnimal from '../src/modules/maintain/ListAnimal'
import SmartFarmApi from '../src/api/SmartFarmApi'

export default class home extends Component {
  // static async getInitialProps(ctx) {
  //   console.log(ctx.req.headers.host);
  //   const axioscfg = ctx.req ? { baseURL: ctx.req.headers.host } : {}
  //   const data = await SmartFarmApi.getAllAnimal(axioscfg)
  //   // let result = data.map((animal) => {
  //   //   animal.pictures = animal.pictures.map(item => {
  //   //     const buff = new Buffer(item.base64.data)
  //   //     return { data: buff.toString(), ID: item.ID }
  //   //   })
  //   //   return animal
  //   // })
  //   return { pageProps: { ddd: 'fff' } }
  // }
  render() {
    return (
      <div>
        <ListAnimal mode="view"/>
      </div>
    )
  }
}
