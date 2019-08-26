import { memo, isValidElement } from 'react'
import { withRouter } from 'next/router'
import { request } from 'lib/api'
import Router from 'next/router'
import Link from 'next/link'
import { Row, Col, List, Pagination } from 'antd'
import { Repo } from 'components'

import './style.less'

const LANGUAGE = ['JavaScript', 'HTML', 'CSS', 'Java']
const SORT_TYPES = [
  {
    name: 'Best Match'
  },
  {
    name: 'Most Stars',
    value: 'stars',
    order: 'desc'
  },
  {
    name: 'Fewest Stars',
    value: 'stars',
    order: 'asc'
  },
  {
    name: 'Most Forks',
    value: 'forks',
    order: 'desc'
  },
  {
    name: 'Fewest Forks',
    value: 'forks',
    order: 'asc'
  },
]

/**
 * sort: 排序方式
 * order: 排序升降顺序
 * lang: 仓库的项目开发主语言
 * page: 分页
 */

const selectedItemStyle = {
  borderLeft: '2px solid #e36209',
  fontWeight: 100,
}

function noop() {}

const per_page = 20

const FilterLink = memo(({ name, q, lang, sort, order, page }) => {
  let queryString = `?q=${q}`
  if (lang) queryString += `&lang=${lang}`
  if (sort) queryString += `&sort=${sort}&order=${order || 'desc'}`
  if (page) queryString += `&page=${page || 1}`
  queryString += `&per_page=${per_page}`

  return <Link href={`/search${queryString}`}>
      {isValidElement(name) ? name : <a>{name}</a>}
    </Link>
})

function Search({ router, repos }) {
  const { ...querys } = router.query
  const { q, lang, sort, order, page } = router.query

  return <div className='root'>
    <Row gutter={20}>
      <Col span={6}>
        <List
          bordered
          header={<span className='list-header'>语言</span>}
          style={{ marginBottom: 20 }}
          dataSource={LANGUAGE}
          renderItem={item => {
            const selected = lang === item
            return (
              <List.Item style={selected ? selectedItemStyle : null}>
                {selected ? (
                  <span>{item}</span>
                ) : (
                  <FilterLink {...querys} lang={item} name={item} />
                )}
              </List.Item>
            )
          }}
        />
        <List
          bordered
          header={<span className='list-header'>排序</span>}
          dataSource={SORT_TYPES}
          renderItem={item => {
            let selected = false
            if (item.name === 'Best Match' && !router.query.sort) {
              selected = true
            } else if (item.value === router.query.sort && item.order === router.query.order) {
              selected = true
            }
            return (
              <List.Item style={selected ? selectedItemStyle : null}>
                {selected ? (
                  <span>{item.name}</span>
                ) : (
                  <FilterLink
                    {...querys}
                    sort={item.value}
                    order={item.order}
                    name={item.name}
                  />
                )}
              </List.Item>
            )
          }}
        />
      </Col>
      <Col span={18}>
        <h3 className="repos-title">{repos.total_count} 个仓库</h3>
        {repos.items.map(repo => (
          <Repo repo={repo} key={repo.id} />
        ))}
        <div className="pagination">
          <Pagination
            pageSize={per_page}
            current={Number(page) || 1}
            total={1000}
            onChange={noop}
            itemRender={(page, type, ol) => {
              const p =
                type === 'page' ? page : type === 'prev' ? page - 1 : page + 1
              const name = type === 'page' ? page : ol
              return <FilterLink {...querys} page={p} name={name} />
            }}
          />
        </div>
      </Col>
    </Row>
  </div>
}

Search.getInitialProps = async ({ ctx }) => {
  const { q, sort, lang, order, page = 1 } = ctx.query
  console.log('ctx.query', ctx.query)
  if (!q) {
    return {
      repos: {
        total_count: 0
      }
    }
  }

  let queryString = `?q=${q}`
  if (lang) queryString += `+language:${lang}`
  if (sort) queryString += `&sort=${sort}&order=${order || 'desc'}`
  if (page) queryString += `&page=${page}`
  queryString += `&per_page=${per_page}`
  const result = await request({
    url: `/search/repositories${queryString}`
  }, ctx.req, ctx.res)

  return {
    repos: result.data
  }
}


export default withRouter(Search)