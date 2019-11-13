import { connect } from 'react-redux';
import  BackPanel  from '../components/BackPanel';

const mapStateToProps = state => {
    return{
        colorHistory: state.colorHistory,
        webPlayerInfo: state.webPlayerInfo
    }
};


export default connect(mapStateToProps)(BackPanel)