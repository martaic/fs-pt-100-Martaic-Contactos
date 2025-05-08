import { resolvePath } from "react-router-dom"

const contactService = {}


contactService.loadAllAgendas = async () => {
    try {
        const resp = await fetch('https://playground.4geeks.com/contact/agendas')
        const data = await resp.json()
        return data
    } catch (error) {
        console.log(error)
    }
}


contactService.getAgenda = async (slug) => {
    try {
        const resp = await fetch('https://playground.4geeks.com/contact/agendas/'+slug)

        if (!resp.ok){
            contactService.createAgenda(slug)
            return 
        }
        const data = await resp.json()
        return data
    } catch (error) {
        console.log(error)
    }
}

contactService.createContact = async (payload) => {
    try {
        const resp = await fetch('https://playground.4geeks.com/contact/agendas/minigoca/contacts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
        })
        const data = await resp.json()
        return contactService.getAgenda('minigoca')
    } catch (error) {
        console.log(error)
    }
}


contactService.createAgenda = async (slug) => {
    try {
        const resp = await fetch('https://playground.4geeks.com/contact/agendas/'+slug, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const data = await resp.json()
        contactService.getAgenda(slug)
    } catch (error) {
        console.log(error)
    }
}


contactService.deleteContact = async (slug, id,dispatch) => {
    try {
       await fetch(`https://playground.4geeks.com/contact/agendas/${slug}/contacts/${id}` , {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        
        const data= await contactService.getAgenda(slug)
        dispatch({type:"getUserAgenda",payload:data.contacts})
    } catch (error) {
        console.log(error)
    }
}

contactService.editContact = async (slug, id, formdata) => {
    try {
        const resp = await fetch(`https://playground.4geeks.com/contact/agendas/${slug}/contacts/${id}` , {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formdata)
        } )
         return contactService.getAgenda(slug)
     } catch (error) {
         console.log(error)
     }
}

export default contactService