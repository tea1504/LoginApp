import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { useSelector } from 'react-redux';
import { selectCommonData } from './store/Common'
import Icon from 'react-native-vector-icons/Fontisto'

const ListItem = ({ data }) => {
  const date = new Date(data.reportTime * 1000);
  const common = useSelector(selectCommonData);
  const { incidentObject, reportStatus, reportType } = common;
  const status = reportStatus?.filter(el => el.code === data.status)[0];
  const report = reportType?.filter(el => el.code === data.reportType)[0];
  const incident = incidentObject?.filter(el => el.code === data.incidentObject)[0];
  return (
    <>
      {reportStatus && <View style={styles.view}>
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
          <Text style={styles.title}>{data.reportNo}</Text>
          <Text style={styles.trangthai(data.status)}>{status.name}</Text>
        </View>
        <Text style={styles.time}>{((date.getDate() < 10) ? "0" : "") +
          date.getDate() +
          (((date.getMonth() + 1) < 10) ? "/0" : "/") +
          (date.getMonth() + 1) +
          "/" + date.getFullYear() +
          ((date.getHours() < 10) ? " 0" : " ") +
          date.getHours() +
          ((date.getMinutes() < 10) ? ":0" : ":") +
          date.getMinutes()}</Text>
        <Text>{report.name} | {incident.name}</Text>
        <Text>{data.detector}</Text>
        <Text>{data.shortDescription}</Text>
        <Icon name='more-v' size={20} color="#0a8d9d" style={{
          position: 'absolute',
          top: '50%',
          right: 20,
        }} />
      </View>}
    </>
  )
}

const styles = StyleSheet.create({
  view: {
    padding: 10,
    margin: 2,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'red',
    backgroundColor: 'white',
    position: 'relative',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  time: {
    fontStyle: 'italic'
  },
  trangthai: (tt) => {
    const color = ['green', 'yellow', 'blue', 'pink', 'red'];
    return {
      color: color[tt],
      fontSize: 16,
      marginLeft: 10,
    };
  },
})

export default ListItem;