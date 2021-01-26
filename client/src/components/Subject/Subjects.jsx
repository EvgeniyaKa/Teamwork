import React from 'react'
import {SubjectList} from './SubjectList'
import {SubjectDetail} from './SubjectDetail'

import {Row, Col} from 'react-bootstrap'

export const Subjects = ({ subjects }) => {
    
    return (
        <Row className="flex-row">
            <Col xl={3}>
                <div className="widget__wrapper has-shadow">
                    <SubjectList subjects={ subjects } />
                </div>
            </Col>
            <Col xl={9}>
                <div className="widget__wrapper has-shadow">
                    <SubjectDetail />
                </div>
            </Col>
        </Row>
    )
}