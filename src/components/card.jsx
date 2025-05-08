import { useNavigate } from "react-router-dom"
import contactService from "../services/contactsServices"
import useGlobalReducer from "../hooks/useGlobalReducer";


export const Card = props => {
    const navigate = useNavigate();
    const { dispatch } = useGlobalReducer()
    const handleDelete = async () => {
        try {
            const resp = await contactService.deleteContact('minigoca', props.cid, dispatch)
            console.log(resp)
        } catch (error) {
            console.log(error);

        }
    }


    const handleEdit = e => {
        e.preventDefault()
        navigate('/edit/' + props.cid)
    }

    return (

        <div className="card col-sm-8 col-md-4 col-lg-6 ">
            <div className="row w-80 mx-auto">
                <div className=" col-md-6 col-lg-6">
                    <img className="img-fluid mx" src="https://us.123rf.com/450wm/azvector/azvector1803/azvector180300049/96953503-los-contactos-manejan-el-tel%C3%A9fono-la-agenda-la-agenda-la-agenda-el-icono-del-tel%C3%A9fono.jpg" alt={props.name} />
                </div>
                <div className="col-md-4 col-lg-6 mt-3 mx-auto">
                    <h3><i class="fa-solid fa-user-plus"></i>   {props.name}</h3>
                    <p><i class="fa-solid fa-phone-volume"></i> {props.phone}</p>
                    <p><i class="fa-solid fa-envelope"></i> {props.email}</p>
                    <p><i class="fa-solid fa-location-dot"></i> {props.address}</p>
                    <button className="btn btn-danger me-2" onClick={handleDelete}>eliminar</button>
                    <button className="btn btn-primary me-2" onClick={handleEdit}>editar</button>

                </div>
            </div>
        </div>


    )
}