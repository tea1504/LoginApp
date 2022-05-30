import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Text,
} from 'react-native';
import DatePicker from 'react-native-neat-date-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/AntDesign';
import Api from './Api';
import ListItem from './ListItem';
import Spinner from 'react-native-loading-spinner-overlay';
import {useDispatch, useSelector} from 'react-redux';
import {selectLoginToken} from './store/Login';
import {
  selectListData,
  setData,
  selectListFilter,
  resetFilter,
  setLoading,
  selectListLoading,
} from './store/List';
import {setData as setDataCommon} from './store/Common';

const Home = ({navigation}) => {
  const dispatch = useDispatch();
  const data = useSelector(selectListData);
  const loading = useSelector(selectListLoading);
  const token = useSelector(selectLoginToken);
  const filter = useSelector(selectListFilter);
  const [date, setDate] = useState('');

  const [showDatePicker, setShowDatePicker] = useState(false);

  const openDatePicker = () => {
    setShowDatePicker(true);
  };

  const onCancel = () => {
    setShowDatePicker(false);
  };

  const onConfirm = async output => {
    setShowDatePicker(false);
    const start = new Date(output.startDate).getTime() / 1000;
    const end = new Date(output.endDate).getTime() / 1000 + 24 * 60 * 60;
    console.log(start + ',' + end);
    const d = await Api.post(
      'getAllReports',
      {page: 1, reportTime: start + ',' + end},
      {
        headers: {
          Authorization: token,
        },
      },
    );
    const startString = output.startDateString.split('-').reverse().join('/');
    const endString = output.endDateString.split('-').reverse().join('/');
    setDate(startString + ' - ' + endString);
    dispatch(setData(d.data.data.data));
  };

  const handleFilter = () => {
    navigation.navigate('Filter');
  };

  const f = async () => {
    dispatch(setLoading(true));
    try {
      const d = await Api.post(
        'getAllReports',
        {page: 1},
        {
          headers: {
            Authorization: token,
          },
        },
      );
      dispatch(setData(d.data.data.data));
      const d2 = await Api.post(
        'getCommon',
        {groups: 'incidentObject, reportStatus, reportType'},
        {
          headers: {
            Authorization: token,
          },
        },
      );
      dispatch(setDataCommon(d2.data.data));
    } catch (error) {
      console.log(error);
    }
    dispatch(resetFilter());
    dispatch(setLoading(false));
  };

  const f2 = async () => {
    dispatch(setLoading(true));
    try {
      let params = {page: 1};
      Object.entries(filter).map(el => {
        if (el[1] !== '') params[el[0]] = el[1];
      });
      console.log(params);
      const d = await Api.post('getAllReports', params, {
        headers: {
          Authorization: token,
        },
      });
      dispatch(setData(d.data.data.data));
    } catch (err) {
      console.log(err);
    }
    dispatch(setLoading(false));
  };

  useEffect(() => {
    f();
  }, []);

  useEffect(() => {
    if (filter.isFilter) f2();
  }, [filter.isFilter]);

  return (
    <>
      <DatePicker
        isVisible={showDatePicker}
        mode="range"
        onCancel={onCancel}
        onConfirm={onConfirm}
      />
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: 'white',
          borderWidth: 1,
          borderColor: '#fff',
          borderBottomColor: '#ddd',
        }}>
        <View
          style={{
            borderColor: '#0a8d9d',
            borderWidth: 1,
            borderRadius: 5,
            flex: 1,
            margin: 10,
            height: 40,
            position: 'relative',
          }}>
          <TextInput value={date} editable={false} onPress={openDatePicker} />
          <Icon
            name="calendar"
            size={20}
            color="#0a8d9d"
            style={{
              margin: 10,
              position: 'absolute',
              top: 0,
              right: 0,
            }}
            onPress={openDatePicker}
          />
        </View>
        <Icon
          name="filter"
          size={35}
          color="#0a8d9d"
          style={{margin: 10}}
          onPress={handleFilter}
        />
      </View>
      {loading && (
        <View style={styles.view}>
          <Icon2 name="loading1" color="#0a8d9d" size={30} />
          <Text>Đang tải dữ liệu...</Text>
        </View>
      )}
      {!loading && (
        <ScrollView style={{margin: 0}}>
          <View>
            {data?.map((el, ind) => (
              <ListItem key={ind} data={el} />
            ))}
          </View>
        </ScrollView>
      )}
      <TouchableOpacity style={styles.button}>
        <Icon name="plus" color="white" size={30} />
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  spinnerTextStyle: {
    color: '#fff',
  },
  button: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    backgroundColor: '#0a8d9d',
    height: 60,
    width: 60,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  view: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    padding: 5,
    backgroundColor: 'white',
  },
});

export default Home;
