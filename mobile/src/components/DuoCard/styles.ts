import { StyleSheet } from 'react-native';
import { THEME } from '../../theme';

export const styles = StyleSheet.create({
  container: {
    width:200,
    borderRadius:8,
    padding:20,
    marginRight:16,
    backgroundColor:THEME.COLORS.SHAPE,
    alignItems:'center'

  },
  button:{
    width:'100%',
    height:36,
    borderRadius:6,
    backgroundColor:THEME.COLORS.PRIMARY,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'center'
  },
  buttonTitle:{
    color:THEME.COLORS.TEXT,
    fontSize:THEME.FONT_SIZE.SM,
    fontFamily:THEME.FONT_FAMILY.SEMI_BOLD,
    marginLeft:8
  }
});