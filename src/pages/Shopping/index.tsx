import { useState } from "react"

import api from "../../services/api"

import Button from "../../components/Button"
import Input from "../../components/Input"

export default function Shopping() {
  let [credits, setCredits] = useState(10)
  let unitPrice = 1.1
  let purchase = JSON.parse(localStorage.getItem("purchase") as string)

  async function buy() {
    const localUser = localStorage.getItem("user") as string

    if (localUser === null) {
      window.location = "/login" as any
    } else {
      let item = {
        id: "676ee8346b6c8dd8cc690bc0",
        quantity: Number(credits)
      }

      localStorage.setItem("purchase", JSON.stringify(item))

      let res = await api.post("/shopping", {
        item
      })

      window.location = res.data.url
    }
  }

  async function continuePurchase() {
    let res = await api.post("/shopping", {
      item: purchase as string
    })

    window.location = res.data.url
  }

  function cancelPurchase() {
    localStorage.removeItem("purchase")
    window.location = "/shopping" as any
  }

  if (purchase) return (
    <main id='Shopping'>
      <div className='previous-purchase'>
        <p>Você tem uma compra não finalizada. Deseja continuar?</p>
        <div className='displays'>
          <p><span>Credits</span> {purchase.quantity} un</p>
          <p><span>Cash</span> R$ {parseInt((purchase.quantity * unitPrice).toString())}</p>
        </div>
        <div className='buttons'>
          <Button type='button' onClick={continuePurchase} label='Continuar' />
          <Button className="cancelButton" type='button' onClick={cancelPurchase} label='Cancelar' />
        </div>
      </div>
    </main>
  )

  return (
    <main id='Shopping'>
      <form>
        <div className='content'>
          <div className='displays'>
            <p><span>Credits</span> {credits} un</p>
            <p><span>Cash</span> R$ {parseInt((credits * unitPrice).toString())}</p>
          </div>
          <Input
            className='range'
            name='range'
            type='range'
            min={10}
            max={200}
            step={10}
            onChange={(e: any)=>setCredits(e.target.value as number)}
            value={credits}
          />
          <Button type="button" onClick={buy} label="Buy" />
        </div>
      </form>
    </main>
  )
}

import "./style.css"
