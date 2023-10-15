import { Page, Text, Document, StyleSheet, Font, View, Svg, G, Path, Defs, ClipPath, Rect } from '@react-pdf/renderer';
import PropTypes from 'prop-types';

Font.register({
  family: 'Inter',
  src: '/Inter_VariableFont_slnt_wght.ttf',
});

const styles = StyleSheet.create({
  page: {
    position: 'relative',
    backgroundColor: '#fff',
    padding: '30 40',
    fontFamily: 'Inter',
    fontSize: 10,
  },
  title: {
    fontSize: 12,
    marginBottom: 80,
    color: '#FF1F00',
  },
  heading: {
    fontWeight: 'semibold',
    borderBottom: 1,
    borderBottomColor: '#ddd',
    paddingBottom: 6,
    marginBottom: 30,
  },
  text: {
    marginBottom: 20,
  },
  price: {
    paddingBottom: 6,
  },
  boderB: {
    borderBottom: 1,
    borderBottomColor: '#ddd',
  },
  mt: {
    marginTop: 90,
  },
  neutral: {
    color: '#999',
    marginBottom: 2,
  },
  flex: {
    fontSize: 10,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
});

export const Receipt = ({ data }) => (
  <Document>
    <Page size="A5" style={styles.page}>
      <Text fixed style={styles.title}>
        Cuebento
      </Text>
      <Text style={styles.heading}>Booking Receipt</Text>
      <Text style={styles.neutral}>Event</Text>
      <Text style={styles.text}>{data.name}</Text>
      <Text style={styles.neutral}>Email</Text>
      <Text style={styles.text}>{data.email}</Text>
      <Text style={styles.neutral}>Payment Id</Text>
      <Text style={styles.text}>{data.paymentID}</Text>
      <Text style={styles.neutral}>Booking Time</Text>
      <Text style={styles.text}>
        {data.date} <Text style={styles.neutral}>Locale - {data.locale}</Text>
      </Text>
      <View style={[styles.flex, styles.boderB, styles.mt, styles.price]}>
        <Text style={styles.neutral}>Price</Text>
        <Text>{data.price}</Text>
      </View>
      <View style={[styles.flex, { paddingTop: 6 }]}>
        <Text style={styles.neutral}>Subtotal</Text>
        <Text>{data.price}</Text>
      </View>
      <View style={[styles.flex, { position: 'absolute', bottom: 30, padding: '0 40', width: '100vw' }]}>
        <View style={[styles.flex, { gap: 8 }]}>
          <Svg width="21" height="10" viewBox="0 0 39 18">
            <G clipPath="url(#clip0_10_148)">
              <Path
                d="M24.623 3C21.9933 3 19.6433 4.36303 19.6433 6.88133C19.6433 9.76935 23.8111 9.96882 23.8111 11.4197C23.8111 12.0306 23.1111 12.5774 21.9153 12.5774C20.2184 12.5774 18.9501 11.8133 18.9501 11.8133L18.4074 14.3546C18.4074 14.3546 19.8685 15 21.8082 15C24.6834 15 26.9457 13.5701 26.9457 11.0087C26.9457 7.95697 22.7605 7.76343 22.7605 6.41679C22.7605 5.93824 23.3352 5.4139 24.5275 5.4139C25.8728 5.4139 26.9703 5.96961 26.9703 5.96961L27.5014 3.5152C27.5014 3.5152 26.3072 3 24.623 3ZM0.563676 3.18524L0.5 3.55572C0.5 3.55572 1.60632 3.75819 2.60275 4.16209C3.88573 4.62523 3.97712 4.89485 4.1932 5.73227L6.54776 14.809H9.70405L14.5666 3.18524H11.4175L8.29305 11.0883L7.01809 4.38929C6.90116 3.6226 6.3089 3.18524 5.58394 3.18524H0.563676ZM15.8329 3.18524L13.3625 14.809H16.3654L18.8271 3.18524H15.8329ZM32.581 3.18524C31.8569 3.18524 31.4733 3.57291 31.1918 4.25036L26.7923 14.809H29.9414L30.5507 13.0492H34.3871L34.7576 14.809H37.5362L35.1122 3.18524H32.581ZM32.9906 6.32562L33.924 10.6874H31.4233L32.9906 6.32562Z"
                fill="#1434CB"
              ></Path>
            </G>
            <Defs>
              <ClipPath id="clip0_10_148">
                <Rect width="38" height="18" fill="white" transform="translate(0.5)"></Rect>
              </ClipPath>
            </Defs>
          </Svg>

          <Svg width="15" height="10" viewBox="0 0 23 18">
            <Path d="M8.46753 3.49707H14.5925V14.5026H8.46753V3.49707Z" fill="#FF5F00"></Path>
            <Path
              d="M8.85609 9C8.85609 6.76389 9.90608 4.78056 11.52 3.49723C10.3339 2.56389 8.83664 2 7.20331 2C3.33386 2 0.203308 5.13056 0.203308 9C0.203308 12.8695 3.33386 16 7.20331 16C8.83664 16 10.3339 15.4361 11.52 14.5028C9.90608 13.2389 8.85609 11.2361 8.85609 9Z"
              fill="#EB001B"
            ></Path>
            <Path
              d="M22.8558 9C22.8558 12.8695 19.7252 16 15.8558 16C14.2225 16 12.7252 15.4361 11.5391 14.5028C13.1725 13.2195 14.203 11.2361 14.203 9C14.203 6.76389 13.153 4.78056 11.5391 3.49723C12.7252 2.56389 14.2225 2 15.8558 2C19.7252 2 22.8558 5.15 22.8558 9Z"
              fill="#F79E1B"
            ></Path>
          </Svg>
        </View>
        <Text style={[styles.neutral, { fontSize: 8 }]}>{Math.floor(new Date().getTime() / 1000)}</Text>
      </View>
    </Page>
  </Document>
);

Receipt.propTypes = {
  data: PropTypes.object,
};
