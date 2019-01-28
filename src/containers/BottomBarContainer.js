import { connect } from 'react-redux';
import  BottomBar  from '../components/BottomBar';

const mapStateToProps = state => {
    return{
        webPlayerStatus: state.webPlayerStatus
    }
};

export default connect(mapStateToProps)(BottomBar)