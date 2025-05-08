import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import contactService from "../services/contactsServices"
import useGlobalReducer from "../hooks/useGlobalReducer"

export const EditContact = () => {
    const params = useParams()
    const { store, dispatch } = useGlobalReducer()
    const navigate = useNavigate()
    const [formData, setFormData] = useState(store.agenda.find(el => el.id == params.id))


    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleCancelar = e => {
        e.preventDefault();
        navigate('/')
    }

    const handleReset = () => {
        setFormData(store.agenda.find(el => el.id == params.id))
    }

    const handleSubmit = async e => {
        try {
            e.preventDefault()
            const resp = await contactService.editContact('minigoca', params.id, formData)
            console.log(resp)
            navigate('/')
        } catch (error) {
            console.log(error)
        }
    }

    return (

        <div className="container-fluid text-center">
            <h2>Edit contact</h2>
            <form className="form-control" onSubmit={handleSubmit}>
                <input type="text" className="form-control" placeholder="name" name="name" value={formData.name} onChange={handleChange} />
                <input type="text" className="form-control" placeholder="phone" name="phone" value={formData.phone} onChange={handleChange} />
                <input type="text" className="form-control" placeholder="email" name="email" value={formData.email} onChange={handleChange} />
                <input type="text" className="form-control" placeholder="address" name="address" value={formData.address} onChange={handleChange} />
                <input type="submit" className="btn btn-primary" />
                <input type="reset" onClick={handleReset} className="btn btn-warning" />
                <button onClick={handleCancelar} className="btn btn-danger">Cancelar</button>
            </form>
        </div>
    )
}