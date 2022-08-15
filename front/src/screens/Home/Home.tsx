import React, { useEffect } from 'react'
import { Button, Card, Col, Menu, Row } from 'antd'
import { BsPersonBoundingBox } from 'react-icons/bs'
import { TbChevronDown } from 'react-icons/tb'
import { FiMenu } from 'react-icons/fi'
import "./Home.less"
import background from "./welcome.jpg"
import { AppDispatch, RootState } from '../../store'
import { useDispatch, useSelector } from 'react-redux'
import { fetchTests } from './HomeSlice'
import { Link } from 'react-router-dom'


function Home() {
  const dispatch:AppDispatch = useDispatch()
  const tests = useSelector((state:RootState) => state.home.tests)

  useEffect(() => {
    dispatch(fetchTests())
  }, [])

  return (
    <div>
      <header className="header">
        <BsPersonBoundingBox size="3em" className="ml-1rem my-05rem" />
        
        <Menu
          className="header-screen_menu"
          mode="horizontal"
          defaultSelectedKeys={['SubMenu']}
        >
          <Menu.SubMenu className="header-screen_menu-submenu" key="SubMenu" title="Available tests" icon={<FiMenu size="2em" />}>
            {tests.map((test:any) => (
              <Menu.Item key={test.title}>
                <Link to={`/test/${test.id}`}>{test.title}</Link>
              </Menu.Item>
            ))}
          </Menu.SubMenu>
        </Menu>
      </header>

      <div className="welcome" style={{ backgroundImage: `url(${background})` }}>
        <div className="welcome-personality_text"><BsPersonBoundingBox size="5rem" /> Personality</div>
        <div className="welcome-test_text">Test</div>
        <div className="welcome-chevron_down">
          <TbChevronDown />
        </div>
      </div>

      <div className="tests_block">
        <h2 className="tests_block-title">Available tests</h2>
        <Row className="tests_block-available_tests" gutter={32}>
        {tests.map((test:any) => (
          <Col span={8} key={test.title}>
            <Card hoverable title={`Test n${test.id}`}>
              {test.title}
              <div className="text-center mt-1rem">
                <Button type="primary"><Link to={`/test/${test.id}`}>Pass</Link></Button>
              </div>
            </Card>
          </Col>
        ))}
        </Row>
      </div>
    </div>
  )
}

export default Home
