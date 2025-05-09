import { useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import contactService from "../services/contactsServices.js";
import { Card } from "../components/card.jsx";
import { Link } from "react-router-dom";

export const Home = () => {
	const { store, dispatch } = useGlobalReducer();

	const fetchAllAgendas = async () => {
		try {
			const data = await contactService.loadAllAgendas();
			console.log(data);
			dispatch({ type: 'getAllAgendas', payload: data.agendas });
		} catch (error) {
			console.log(error);
		}
	};

	const fetchAgenda = async (username) => {
		try {
			const data = await contactService.getAgenda(username);
			console.log(data);
			dispatch({ type: 'getUserAgenda', payload: data.contacts });
		} catch (error) {
			console.log(error);
		}
	};

	const handleCreateUser = async () => {
		try {
			await contactService.createAgenda('minigoca');
			await fetchAgenda('minigoca');
		} catch (error) {
			console.error("Error al crear el usuario:", error);
		}
	};

	useEffect(() => {
		fetchAgenda('minigoca');
	}, []);

	return (
		<div className="mt-5">
			<div className="row">
				{store.agenda?.map(el => (
					<Card
						key={el.id}
						cid={el.id}
						name={el.name}
						phone={el.phone}
						email={el.email}
						address={el.address}
					/>
				))}
			</div>
			<Link to={"/new_contact"}>
				<div class="text-center mt-3">
					<button class="btn btn-success">
						<i class="fa-solid fa-address-book"></i> Crear Contacto
					</button>
				</div>

			</Link>

		</div>
	);
};
