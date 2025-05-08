import { useState } from "react"
import { useNavigate } from "react-router-dom"
import contactService from "../services/contactsServices"

export const NewContact = () => {

    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        address: ''
    })


    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleCancelar = e => {
        e.preventDefault();
        navigate('/')
    }


    const handleSubmit = async e => {
        try {
            e.preventDefault()
            const resp = await contactService.createContact(formData)
            console.log(resp)
            navigate('/')
        } catch (error) {
            console.log(error)
        }
    }

    return (

        <div className="container-fluid text-center">
            <h2>Nuevo Contacto</h2>
            <form className="form-control" onSubmit={handleSubmit}>
                <input type="text" className="form-control" placeholder="name" name="name" value={formData.name} onChange={handleChange} />
                <input type="text" className="form-control" placeholder="phone" name="phone" value={formData.phone} onChange={handleChange} />
                <input type="text" className="form-control" placeholder="email" name="email" value={formData.email} onChange={handleChange} />
                <input type="text" className="form-control" placeholder="address" name="address" value={formData.address} onChange={handleChange} />
                <input type="submit" className="btn btn-primary me-2 mt-2" />
                <input type="reset" className="btn btn-warning me-2 mt-2" />
                <button onClick={handleCancelar} className="btn btn-success me-2 mt-2">Contactos</button>

            </form>
        </div>
    )
}