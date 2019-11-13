import { connect } from 'react-redux';
import  BackPanel  from '../components/BackPanel';
import { colorHistoryChange} from "../redux/actions";

const mapStateToProps = state => {
    return{
        colorHistory: state.colorHistory
    }
};


export default connect(mapStateToProps)(BackPanel)