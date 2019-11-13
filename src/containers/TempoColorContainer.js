import { connect } from "react-redux";
import TempoColor from "../components/TempoColor";

const mapStateToProps = state => {
  return {
    webPlayerStatus: state.webPlayerStatus,
    webPlayerInfo: state.webPlayerInfo
  };
};

export default connect(mapStateToProps)(TempoColor);
