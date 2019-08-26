import { Repo } from 'components'
import { withRouter } from 'next/router'
import Link from 'next/link'
import { request } from 'lib/api'


function Detail({ router, repoBasic }) {
  return <div className="root">
    <div className="repo-basic">
      <Repo repo={repoBasic} />
      <div className="tabs">
        <Link href="/detail">
          <a className="index">Readme</a>
        </Link>
        <Link href="/detail/issues">
        <a className="issues">Issues</a>
        </Link>
      </div>
    </div>
    <div></div>
  </div>
}

Detail.getInitialProps = async ({ ctx }) => {
  console.log('ctx', ctx)
  const { owner, name } = ctx.query
  const repoBasic = await request({
    url: `/repos/${owner}/${name}`,
  }, ctx.req, ctx.res)

  return {
    repoBasic: repoBasic.data
  }
}


export default withRouter(Detail)