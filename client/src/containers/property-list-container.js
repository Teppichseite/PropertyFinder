import { connect } from 'react-redux'
import PropertyList from '../components/PropertyList';

const mapStateToProps = state => {

    console.log(state);

    return {
        properties: state.findProperties.properties,
        isPending: state.findProperties.pending,
        hasError: state.findProperties.error
    }
};

const mapDispatchToProps = dispatch => ({});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PropertyList)

