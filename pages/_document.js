import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
   
    render() {
      return (
        <Html>
          <Head>
     <script defer src="../assets/plugins/fontawesome/js/all.min.js"></script>
    
    {/* <link id="theme-style" rel="stylesheet" href="assets/css/portal.css" /> */}
          </Head>
          <body className="app">
            <Main />
            <NextScript />
            <script src="../assets/plugins/popper.min.js"></script>
            <script src="../assets/plugins/bootstrap/js/bootstrap.min.js"></script>  
            <script src="../assets/plugins/chart.js/chart.min.js"></script> 
            <script src="assets/js/index-charts.js"></script>   
            <script src="../public/assets/js/app.js"></script> 
          </body>
        </Html>
      )
    }
  }
  
  export default MyDocument