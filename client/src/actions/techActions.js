import {
	GET_TECHS,
	ADD_TECH,
	DELETE_TECH,
	TECHS_ERROR,
	SET_LOADING,
} from './types';

export const getTechs = () => async (dispatch) => {
	try {
		setLoading();

		const res = await fetch('/api/techs', {
			method: 'GET',
			body: JSON.stringify(),
			headers: { 'Content-Type': 'application/json' },
		});
		const data = await res.json();

		dispatch({
			type: GET_TECHS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: TECHS_ERROR,
			payload: error,
		});
	}
};

export const addTech = (tech) => async (dispatch) => {
	try {
		setLoading();

		const res = await fetch('/api/techs', {
			method: 'POST',
			body: JSON.stringify(tech),
			headers: { 'Content-Type': 'application/json' },
		});
		const data = await res.json();

		dispatch({
			type: ADD_TECH,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: TECHS_ERROR,
			payload: error,
		});
	}
};

export const deleteTech = (_id) => async (dispatch) => {
	try {
		setLoading();

		await fetch(`/api/techs/${_id}`, {
			method: 'DELETE',
		});

		dispatch({
			type: DELETE_TECH,
			payload: _id,
		});
	} catch (error) {
		dispatch({
			type: TECHS_ERROR,
			payload: error.response.statusText,
		});
	}
};

export const setLoading = () => {
	return {
		type: SET_LOADING,
	};
};
