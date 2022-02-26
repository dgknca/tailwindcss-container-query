import '../styles/global.css'

if (typeof window !== 'undefined') {
  const supportsContainerQueries = "container" in document.documentElement.style;
  if (!supportsContainerQueries) {
    import("container-query-polyfill")
  }
}

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
