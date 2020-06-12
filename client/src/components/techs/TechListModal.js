import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getTechs } from '../../actions/techActions';
import TechItem from './TechItem';

const TechListModal = ({ getTechs, tech: { techs, loading } }) => {
	useEffect(() => {
		getTechs();
		//eslint-disable-next-line
	}, [techs]);

	return (
		<div id='tech-list-modal' className='modal'>
			<div className='modal-content'>
				<h4>Technician List</h4>
				<ul className='collection'>
					{!loading &&
						techs &&
						techs.map((tech) => <TechItem tech={tech} key={tech._id} />)}
				</ul>
			</div>
		</div>
	);
};

TechListModal.propTypes = {
	tech: PropTypes.object.isRequired,
	getTechs: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	tech: state.tech,
});

export default connect(mapStateToProps, { getTechs })(TechListModal);
