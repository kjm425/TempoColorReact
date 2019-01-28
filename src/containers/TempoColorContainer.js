import { connect } from 'react-redux';
import  TempoColor from '../components/TempoColor';

const mapStateToProps = state => {
    return{
        webPlayerStatus: state.webPlayerStatus
    }
};

export default connect(mapStateToProps)(TempoColor)