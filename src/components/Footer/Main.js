import React, {Component} from 'react';
import ReactNative from 'react-native';
import {
  FooterSetup,
  FooterReport,
  FooterPreview
}
from './';

const {
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableHighlight,
  TouchableOpacity,
  Linking
} = ReactNative;

/**
 * Container component for Setup page
 */
class Main extends Component {

  /**
    * Setup Container Constructor
    * @param {props} props from parent component
    * @return {void}
    */
  constructor(props) {
    super(props);
  }

  /**
   * Render Setup page
   * @return {jsxresult} result in jsx format
   */
  render() {
    const {page, isEdit} = this.props;
    
    let renderCom = null;
    if (page==='Report') {
      renderCom = 
        <FooterReport 
          pressReportFooterBtn={(bigCategory)=>{this.props.pressReportFooterBtn(bigCategory);}}
          selectedBigCategory={this.props.selectedBigCategory}
          handleEditReport={()=>this.props.handleEditReport()}
          isEdit={isEdit}
        />;
    } else if(page==='Setup') {
      renderCom =
        <FooterSetup
          reportEditBtnClicked={this.props.reportEditBtnClicked}
          userEditBtnClicked={this.props.userEditBtnClicked}
          changePage={(innerPage)=>{
            this.props.changePage(innerPage);
          }}
          changeEditToggle={(reportEditBtnClicked, userEditBtnClicked)=>{
            this.props.changeEditToggle(reportEditBtnClicked, userEditBtnClicked);
          }}
        />;
    } else if(page==='Preview') {
      renderCom = <FooterPreview />;
    }
    return (
      <View>
          <Image source={require('../../assets/imgs/menuBackground.png')} style={{height:60, width:'100%'}}>            
            {renderCom}
          </Image>
      </View>
      
      
    );
  }
}

let styles = StyleSheet.create({
  
});

export default Main;