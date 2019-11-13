import { connect } from 'react-redux';
import  ColorDot  from '../components/ColorDot';

const mapStateToProps = state => {
    return{
        webPlayerInfo: state.webPlayerInfo,
        colorHistory: state.colorHistory
    }
};

export default connect(mapStateToProps)(ColorDot)