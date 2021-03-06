import React, {Component} from 'react';
import ReactNative from 'react-native';
import {
  InnerReportLeft,
  InnerReportRight
} from './';

import {
  CameraPic,
  Notes,
  CategoryNotes,
  Limitations,
  NewItem,
  EditItem,
  NewDetailItem,
  EditDetailItem
} from '../components/Molecule';

const {
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableHighlight,
  Linking
} = ReactNative;

/**
 * Container component for InnerReport page
 */
class InnerReport extends Component {

  /**
    * InnerReport Container Constructor
    * @param {props} props from parent component
    * @return {void}
    */
  constructor(props){
    super(props);
    this.state = {
      listIndex: 0,
      listSubIndex: 0,
      goDetail: true,
      selectedGoDetailItemIndex: null,
      isSectionNoteVisible: false,
      isAddNewItemVisible: false,
      isEditItemVisible: false,
      isAddNewDetailItemVisible: false,
      isEditDetailItemVisible: false,
      tempEditItemText: '',
      tempEditDetailItemText: ''
    }
  }

  // letf
  handleChangeItem(listIndex, listSubIndex, label) {
    this.setState({
      listIndex: listIndex,
      listSubIndex: listSubIndex
    },()=>{
      this.props.cancelDetail();
      this.props.setListIndexSubIndex(listIndex, listSubIndex);
    });
  }

  handleChangeRightItem(selectedArray) {
    this.props.handleChangeRightItem(this.state.listIndex, this.state.listSubIndex, selectedArray);
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.selectedBigCategory !== nextProps.selectedBigCategory) {
      this.setState({
        listIndex: 0,
        listSubIndex: 0
      }, ()=>{
        this.props.setListIndexSubIndex(0, 0);
      });
    }
  }

  handleGoDetail(index) {
    this.props.handleGoDetail(index);
  }

  handleGoEditItem(index, itemValue) {
    this.props.handleGoEditItem(index);
    this.setState({
      isEditItemVisible: !this.state.isEditItemVisible,
      tempEditItemText: itemValue
    });
  }

  handleGoEditDetailItem(index, itemValue) {
    this.props.handleGoEditDetailItem(index);
    this.setState({
      isEditDetailItemVisible: !this.state.isEditDetailItemVisible,
      tempEditDetailItemText: itemValue
    });
  }
  /**
   * Render InnerReport page
   * @return {jsxresult} result in jsx format
   */
  render() {
    const {reportData, goDetail, selectedGoDetailItemIndex, isEdit, addressName} = this.props;
    const {listIndex, listSubIndex, isSectionNoteVisible, isAddNewItemVisible, isEditItemVisible, isEditDetailItemVisible, isAddNewDetailItemVisible } = this.state;
    const {isCameraPicVisible, sectionNote, selectedBigCategory, isCategoryNoteVisible, isLimitationNoteVisible} = this.props;
    if ( !reportData )
      return null;

    let endData = [];
    let data = [];

    let location = '';
    let floor = '';
    let life = '';
    let cost = '';
    let notes = '';
    let categoryName = '';
    let limitations = [];

    let images = [];
    let highlight = false;

    let count = 0;
    for (var k in reportData) {
      if (count === listIndex && reportData[k][listSubIndex]) {
        categoryName = reportData[k][listSubIndex].name;

        data = reportData[k][listSubIndex].data;
        endData = reportData[k][listSubIndex].endData;

        location = reportData[k][listSubIndex].location;
        floor = reportData[k][listSubIndex].floor;
        life = reportData[k][listSubIndex].life;
        cost = reportData[k][listSubIndex].cost;

        notes = reportData[k][listSubIndex].notes;

        images = reportData[k][listSubIndex].images;
        limitations = reportData[k][listSubIndex].limitations;
        highlight = reportData[k][listSubIndex].highlight;
      }
      count++;
    }

    let dataList = [];
    data.map((item, index)=>{
      dataList[index] = {'label':item.name, 'value': index, 'selected': item.selected};
    });
    
    let endDataList = [];
    endData.map((item, index)=>{
      if (selectedGoDetailItemIndex!==null && data[selectedGoDetailItemIndex].endDataSelected.indexOf(index) !== -1)
        endDataList[index] = {'label':item.name, 'value': index, 'selected': '1'};
      else
        endDataList[index] = {'label':item.name, 'value': index, 'selected': '0'};
    });

    return (
      <View style={{flex:1, flexDirection: 'row' }}>        
        <View style={{width: 360}}>
          <InnerReportLeft 
            reportData = {reportData}
            handleChangeItem = {(listIndex, listSubIndex, label)=>{this.handleChangeItem(listIndex, listSubIndex, label)}}
            handleLeftIcon = {(label, listSubIndex, listIndex, isDefaultCategory)=>{this.props.handleLeftIcon(label, listSubIndex, listIndex, isDefaultCategory)}}
            onVisibleSectionNote={()=>{
              this.setState({
                isSectionNoteVisible: true
              })
            }}
            listIndex= {this.state.listIndex}
            listSubIndex= {this.state.listSubIndex}
            isEdit={isEdit}
          />
        </View>
        <View style={{flex: 1}}>
          <InnerReportRight 
            dataList = {dataList}
            location={location}
            floor={floor}
            life={life}
            cost={cost}
            goDetail={goDetail}
            endDataList={endDataList}
            isEdit={isEdit}
            addressName={addressName}
            highlight={highlight}
            handleChangeHighlight={(val)=>{this.props.handleChangeHighlight(val);}}
            handleChangeCompass={(val)=>{this.props.handleChangeCompass(listIndex, listSubIndex, val);}}
            handleChangeFloor={(val)=>{this.props.handleChangeFloor(listIndex, listSubIndex, val);}}
            handleChangeFiveStep={(val, type)=>{this.props.handleChangeFiveStep(listIndex, listSubIndex, val, type);}}
            handleChangeRightItem = {(selectedArray)=>{this.handleChangeRightItem(selectedArray)}}
            handleGoDetail={(index)=>{this.handleGoDetail(index);}}
            handleGoEditItem={(index, itemValue)=>{this.handleGoEditItem(index, itemValue);}}
            handleGoEditDetailItem={(index, itemValue)=>{this.handleGoEditDetailItem(index, itemValue);}}
            handleCreateItem={()=>{
              this.setState({
                isAddNewItemVisible: !this.state.isAddNewItemVisible
              });
              /*
              this.props.handleCreateItem(listIndex, listSubIndex);
              */
            }}
            handleCreateDetailItem={()=>{
              this.setState({
                isAddNewDetailItemVisible: !this.state.isAddNewDetailItemVisible
              });
            }}
          />
        </View>

        {
          isAddNewItemVisible && 
          <View>
            <NewItem
              onDisableNewItemVisible={()=>{
                this.setState({
                  isAddNewItemVisible: !this.state.isAddNewItemVisible
                });
              }}
              onSaveNewItem={(text)=>{
                this.setState({
                  isAddNewItemVisible: !this.state.isAddNewItemVisible
                }, ()=>{
                  this.props.onSaveNewItem(listIndex, listSubIndex, text);
                });                
              }}
            />
          </View>
        }

        {
          isAddNewDetailItemVisible && 
          <View>
            <NewDetailItem
              onDisableNewDetailItemVisible={()=>{
                this.setState({
                  isAddNewDetailItemVisible: !this.state.isAddNewDetailItemVisible
                });
              }}
              onSaveNewDetailItem={(text)=>{
                this.setState({
                  isAddNewDetailItemVisible: !this.state.isAddNewDetailItemVisible
                }, ()=>{
                  this.props.onSaveNewDetailItem(listIndex, listSubIndex, text);
                });                
              }}
            />
          </View>
        }

        {
          isEditItemVisible &&
          <View>
            <EditItem
              onDisableEditItemVisible={()=>{
                this.setState({
                  isEditItemVisible: !this.state.isEditItemVisible
                });
              }}
              onDelEditItem={()=>{
                this.setState({
                  isEditItemVisible: !this.state.isEditItemVisible
                }, ()=>{
                  this.props.onDelEditItem(listIndex, listSubIndex)
                });                
              }}
              onSaveEditItem={(text)=>{
                this.setState({
                  isEditItemVisible: !this.state.isEditItemVisible
                }, ()=>{
                  this.props.onSaveEditItem(listIndex, listSubIndex, text);
                });
              }}
              defaultValue={this.state.tempEditItemText}
            />
          </View>
        }

        {
          isEditDetailItemVisible &&
          <View>
            <EditDetailItem
              onDisableEditDetailItemVisible={()=>{
                this.setState({
                  isEditDetailItemVisible: !this.state.isEditDetailItemVisible
                });
              }}
              onDelEditDetailItem={()=>{
                this.setState({
                  isEditDetailItemVisible: !this.state.isEditDetailItemVisible
                }, ()=>{
                  this.props.onDelEditDetailItem(listIndex, listSubIndex)
                });                
              }}
              onSaveEditDetailItem={(text)=>{
                this.setState({
                  isEditDetailItemVisible: !this.state.isEditDetailItemVisible
                }, ()=>{
                  this.props.onSaveEditDetailItem(listIndex, listSubIndex, text);
                });
              }}
              defaultValue={this.state.tempEditDetailItemText}
            />
          </View>
        }


        {
          isLimitationNoteVisible &&
          <View>
            <Limitations
              onLimitationNote={()=>{this.props.onLimitationNote();}}
              limitationPropData={limitations}
              setLimitation={(limitations)=>{
                this.props.setLimitation(limitations);
              }}
            />
          </View>          
        }

        {
          isCategoryNoteVisible &&
          <View>
            <CategoryNotes
              categoryNote={notes}
              categoryName={categoryName}
              onSaveCategoryNote={
                (categoryNote)=>{
                  this.props.onSaveCategoryNote(
                    this.state.listIndex,
                    this.state.listSubIndex,
                    categoryNote
                  );
                }
              }
              onDisableCategoryNoteVisible = {()=>{
                this.props.onCategoryNoteToggle();
              }}
              onDelCategoryNote={()=>{              
                this.props.onDelCategoryNote(this.state.listIndex, this.state.listSubIndex);
              }}

            />
          </View>
        }
        {
          isSectionNoteVisible && 
          <View>
            <Notes
              sectionNote={sectionNote}
              sectionName={selectedBigCategory}
              onSaveSectionNote={
                (sectionNote)=>{
                  this.setState({
                    isSectionNoteVisible: false
                  }, ()=>{
                    this.props.onSaveSectionNote(sectionNote);
                  });                  
                }
              }
              onDisableSectionNoteVisible = {()=>{
                this.setState({
                  isSectionNoteVisible: false
                });
              }}
              onDelSectionNote={()=>{
                this.setState({
                  isSectionNoteVisible: false
                }, ()=>{
                  this.props.onDelSectionNote();
                });
              }}
            />
          </View>
        }
        {
          isCameraPicVisible &&
          <View>
            <CameraPic 
              propImages={images}
              onDelImages={(imageIndex)=>{this.props.onDelImages(listIndex, listSubIndex, imageIndex);}}
              onSaveImage={(imageIndex, res)=>{this.props.onSaveImage(listIndex, listSubIndex, imageIndex, res);}}
              onAddImage={(res)=>{this.props.onAddImage(listIndex, listSubIndex, res);}}
              onDisableCameraPicVisible = {()=>{
                this.props.onDisableCameraPicVisible();
              }}
            />
          </View>
        }
      </View>
    );
  }
}

let styles = StyleSheet.create({
  
});

export default InnerReport;
