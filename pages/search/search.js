import { withRouter } from 'next/router'


function Search({ router }) {
  const { query } = router
  return <div>{query.search}</div>
}


export default withRouter(Search)