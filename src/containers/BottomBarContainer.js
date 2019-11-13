import { connect } from 'react-redux';
import  BottomBar  from '../components/BottomBar';

const mapStateToProps = state => {
    return{
        webPlayerStatus: state.webPlayerStatus,
        webPlayerInfo: state.webPlayerInfo
    }
};

export default connect(mapStateToProps)(BottomBar)