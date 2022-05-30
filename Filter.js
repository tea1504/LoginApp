import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {selectCommonData} from './store/Common';
import DropDownPicker from 'react-native-dropdown-picker';
import Api from './Api';
import {
  selectListFilter,
  setFilterObject,
  setFilterStatus,
  setFilterReport,
  resetFilter,
  setFilter,
  setFilterDepartment,
} from './store/List';
import {selectDepartmentData, setData} from './store/Department';
import {selectLoginToken} from './store/Login';

const Filter = ({navigation}) => {
  const dispatch = useDispatch();
  const filter = useSelector(selectListFilter);
  const depart = useSelector(selectDepartmentData);
  const token = useSelector(selectLoginToken);
  const {incidentObject, reportStatus, reportType} =
    useSelector(selectCommonData);
  const [openO, setOpenO] = useState(false);
  const [openS, setOpenS] = useState(false);
  const [openR, setOpenR] = useState(false);
  const [openD, setOpenD] = useState(false);
  const object = incidentObject.map(el => {
    return {label: el.name, value: el.code};
  });
  const status = reportStatus.map(el => {
    return {label: el.name, value: el.code};
  });
  const report = reportType.map(el => {
    return {label: el.name, value: el.code};
  });
  const department = depart.map(el => {
    return {label: el.departmentName, value: el.id};
  });

  const handleFilter = () => {
    dispatch(setFilter(true));
    navigation.goBack();
  };

  const f = async () => {
    try {
      const d = await Api.post(
        'getAllDepartments',
        {},
        {
          headers: {
            Authorization: token,
          },
        },
      );
      dispatch(setData(d.data.data.data));
    } catch (error) {
      console.log(error);
    }
    dispatch(resetFilter());
  };

  useEffect(() => {
    f();
  }, []);

  return (
    <View style={styles.view}>
      <DropDownPicker
        style={styles.drop}
        open={openO}
        value={filter.incidentObject}
        items={object}
        setOpen={setOpenO}
        onSelectItem={e => dispatch(setFilterObject(e.value))}
        placeholder="Chọn đối tượng"
      />
      <DropDownPicker
        style={styles.drop}
        open={openS}
        value={filter.status}
        items={status}
        setOpen={setOpenS}
        onSelectItem={e => dispatch(setFilterStatus(e.value))}
        placeholder="Chọn trạng thái"
      />
      <DropDownPicker
        style={styles.drop}
        open={openR}
        value={filter.reportType}
        items={report}
        setOpen={setOpenR}
        onSelectItem={e => dispatch(setFilterReport(e.value))}
        placeholder="Chọn loại báo cáo"
      />
      <DropDownPicker
        style={styles.drop}
        open={openD}
        value={filter.departmentId}
        items={department}
        setOpen={setOpenD}
        onSelectItem={e => dispatch(setFilterDepartment(e.value))}
        placeholder="Chọn bộ phận"
      />
      <TouchableOpacity style={styles.button} onPress={handleFilter}>
        <Text style={styles.buttonText}>Lọc</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    padding: 10,
    margin: 2,
    position: 'relative',
  },
  drop: {
    zIndex: 0,
    marginTop: 10,
    marginBottom: 10,
  },
  button: {
    width: '100%',
    backgroundColor: '#0a8d9d',
    padding: 15,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default Filter;
