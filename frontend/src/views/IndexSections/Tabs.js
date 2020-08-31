/*!

=========================================================
* Argon Design System React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-design-system-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-design-system-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, {useEffect, useState} from 'react';
// nodejs library that concatenates classes
import classnames from "classnames";

// reactstrap components
import {
  Card,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  TabContent,
  TabPane,
  Row,
  Col,
  Badge,
  Button,
  Modal,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  CardHeader,
  Alerts,
  UncontrolledAlert
} from "reactstrap";

import api from '../../services/api';
import Question from '../../components/Question';

class TabsSection extends React.Component {
  state = {
    iconTabs: 1,
    plainTabs: 1,
    questions:[],
    questionsP:[],
    questionsM:[],
    questionsT:[],
    enunciado:'',
    categoria:'',
    dificuldade:'',
    respostaCorreta:'',
    respostasIncorretas:'',
    alerta:'',
    id:'',
    action: 'Cadastrar nova'
  };
  toggleNavs = async (e, state, index) => {
    if(e != null){
      e.preventDefault();
    }
    await this.loadingQuestions(index)
    this.setState({
      [state]: index,
      categoria: index
    });
  };
  toggleModal = async (state,id = 0,action = '') => {
    this.setState({ alerta: ''});
    if(this.state.formModal === true){
      this.setState({
        action:'Cadastrar nova',
        enunciado:'',
        dificuldade:'',
        respostaCorreta:'',
        respostasIncorretas:''
      })
    }
    if(action == 'Cadastrar nova'){
      this.setState({
        action:'Cadastrar nova',
      })
    }
    if(id != 0){
      this.setState({ id: id});
    }
    if(action == 'edit'){
      const response = await api.get('/questions/'+this.state.id);
      this.setState({
        action:'Editar',
        enunciado:response.data.question,
        categoria:response.data.category,
        dificuldade:response.data.difficulty,
        respostaCorreta:response.data.correct_answer,
        respostasIncorretas:response.data.incorrect_answers.join(),
      })
    }
    this.setState({
      [state]: !this.state[state]
    });
  };
  async componentDidMount ()  {
    const response = await api.get('/questions/50/1');
    this.setState({ questions: response.data.docs });
  }
  async loadingQuestions(category){
    const response = await api.get('/questions/50/'+category);
    switch (category) {
      case 1:
        this.setState({ questions: response.data.docs });
        break;
      case 2:
        this.setState({ questionsP: response.data.docs });
        break;
      case 3:
        this.setState({ questionsM: response.data.docs });
        break;
      case 4:
        this.setState({ questionsT: response.data.docs });
      break;
    }
  }
  excluirQuestao = async () =>{
    const response = await api.delete('/questions/'+this.state.id);
    this.toggleNavs(null, "plainTabs", parseInt(this.state.categoria))
    await this.sleep(1000);
    this.setState({
      notificationModal: false
    })
  }
  handleSubmit = async (event) =>  {
    event.preventDefault();
    if(this.state.enunciado == '' ||
       this.state.dificuldade == '' ||
       this.state.respostaCorreta == '' ||
       this.state.respostasIncorretas == ''
       ){
        this.setState({ alerta: <UncontrolledAlert color="danger" fade={false}>
      <span className="alert-inner--icon">
        <i className="ni ni-notification-70" />
      </span>
      <span className="alert-inner--text ml-1">
        <strong>Erro!</strong> Todos os campos são obrigatórios
      </span>
      </UncontrolledAlert> });
    }else{
      const data = {
        category: parseInt(this.state.categoria),
        type: "multiple",
        difficulty:this.state.dificuldade ,
        question: this.state.enunciado,
        correct_answer: this.state.respostaCorreta,
        incorrect_answers: this.state.respostasIncorretas.split(',')
      }
      if(this.state.action == 'Editar'){
        const response = await api.put('/questions/'+this.state.id,data);

        if(response.data._id != ''){
          this.setState({ alerta: <UncontrolledAlert color="success" fade={false}>
          <span className="alert-inner--icon">
            <i className="ni ni-like-2" />
          </span>
          <span className="alert-inner--text ml-1">
            <strong>Sucesso!</strong> Pergunta atualizada com sucesso
          </span>
          </UncontrolledAlert> });
        }else{
          this.setState({ alerta: <UncontrolledAlert color="danger" fade={false}>
          <span className="alert-inner--icon">
            <i className="ni ni-like-2" />
          </span>
          <span className="alert-inner--text ml-1">
            <strong>Erro!</strong> Ocorreu algum erro
          </span>
          </UncontrolledAlert> });
        }
      }else{
        const response = await api.post('/questions',data);

        if(response.data._id != ''){
          this.setState({ alerta: <UncontrolledAlert color="success" fade={false}>
          <span className="alert-inner--icon">
            <i className="ni ni-like-2" />
          </span>
          <span className="alert-inner--text ml-1">
            <strong>Sucesso!</strong> Pergunta cadastrada com sucesso
          </span>
          </UncontrolledAlert> });
        }else{
          this.setState({ alerta: <UncontrolledAlert color="danger" fade={false}>
          <span className="alert-inner--icon">
            <i className="ni ni-like-2" />
          </span>
          <span className="alert-inner--text ml-1">
            <strong>Erro!</strong> Ocorreu algum erro
          </span>
          </UncontrolledAlert> });
        }
      }
      this.toggleNavs(null, "plainTabs", parseInt(this.state.categoria))
      await this.sleep(1000);
      this.setState({
        formModal: false,
        notificationModal: false,
        enunciado:'',
        dificuldade:'',
        respostaCorreta:'',
        respostasIncorretas:''
      })
    }
  }
  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  render() {

    const { questions,questionsP,questionsM,questionsT,alerta } = this.state;

    return (
      <>
        <h3 className="h4 text-success font-weight-bold mb-4">Perguntas</h3>
        <Row className="justify-content-center">
          <Col className="mt-5 mt-lg-0" lg="12">
            {/* Menu */}
            <div className="mb-3">
              <small className="text-uppercase font-weight-bold">
              <Button
              block
              color="default"
              type="button"
              onClick={() => this.toggleModal("formModal",0,'Cadastrar nova')}
            >
              Nova pergunta
            </Button>
            <Modal
              className="modal-dialog-centered"
              size="lg"
              isOpen={this.state.formModal}
              toggle={() => this.toggleModal("formModal")}
            >
              <div className="modal-body p-0">
                <Card className="bg-secondary shadow border-0">
                  <CardHeader className="bg-white pb-5">
                    <div className="text-muted text-center mb-3">
                      <h3 className="h4 text-success font-weight-bold mb-4">{this.state.action} pergunta</h3>
                    </div>
                  </CardHeader>
                  <CardBody className="px-lg-5 py-lg-5">
                    <Form role="form" onSubmit={this.handleSubmit}>
                      <FormGroup>
                        <Input placeholder="Enunciado" type="text" onChange={event => this.setState({ enunciado: event.target.value })} value={this.state.enunciado}/>
                      </FormGroup>
                      <FormGroup>
                        <Input placeholder="Categoria" type="text" placeholder=" 1 - Direito, 2 - Psicologia, 3 - Medicina, 4 - TI" value={this.state.action == 'Editar' ? this.state.categoria : undefined} onChange={event => this.setState({ categoria: event.target.value })}/>
                      </FormGroup>
                      <FormGroup>
                        <Input placeholder="Dificuldade" type="text" placeholder=" Facil, Medio, Dificil" value={this.state.dificuldade} onChange={event => this.setState({ dificuldade: event.target.value })}/>
                      </FormGroup>
                      <FormGroup>
                        <Input placeholder="Resposta correta" type="text" value={this.state.respostaCorreta} onChange={event => this.setState({ respostaCorreta: event.target.value })}/>
                      </FormGroup>
                      <FormGroup>
                        <Input placeholder="Resposta incorretas (separadas por,)" type="text" value={this.state.respostasIncorretas} onChange={event => this.setState({ respostasIncorretas: event.target.value })}/>
                      </FormGroup>
                      <div className="text-center">
                        <Button className="my-4" color="primary" type="submit">
                          Salvar
                        </Button>
                      </div>

                      {alerta}
                    </Form>
                  </CardBody>
                </Card>
              </div>
            </Modal>
              </small>
            </div>
            <div className="nav-wrapper">
              <Nav
                className="nav-fill flex-column flex-md-row"
                id="tabs-icons-text"
                pills
                role="tablist"
              >
                <NavItem>
                  <NavLink
                    aria-selected={this.state.plainTabs === 1}
                    className={classnames("mb-sm-3 mb-md-0", {
                      active: this.state.plainTabs === 1
                    })}
                    onClick={e => this.toggleNavs(e, "plainTabs", 1)}
                    href="#pablo"
                    role="tab"
                  >
                    Direito
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    aria-selected={this.state.plainTabs === 2}
                    className={classnames("mb-sm-3 mb-md-0", {
                      active: this.state.plainTabs === 2
                    })}
                    onClick={e => this.toggleNavs(e, "plainTabs", 2)}
                    href="#pablo"
                    role="tab"
                  >
                    Psicologia
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    aria-selected={this.state.plainTabs === 3}
                    className={classnames("mb-sm-3 mb-md-0", {
                      active: this.state.plainTabs === 3
                    })}
                    onClick={e => this.toggleNavs(e, "plainTabs", 3)}
                    href="#pablo"
                    role="tab"
                  >
                    Medicina
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    aria-selected={this.state.plainTabs === 4}
                    className={classnames("mb-sm-3 mb-md-0", {
                      active: this.state.plainTabs === 4
                    })}
                    onClick={e => this.toggleNavs(e, "plainTabs", 4)}
                    href="#pablo"
                    role="tab"
                  >
                    TI
                  </NavLink>
                </NavItem>
              </Nav>
            </div>
            <Card className="shadow">
              <CardBody>
                <TabContent activeTab={"plainTabs" + this.state.plainTabs}>
                  <TabPane tabId="plainTabs1">
                  {questions.map(question => (
                    <span key={question._id} onClick={() => this.toggleModal("notificationModal",question._id)}>
                      <p className="description">
                        {question.question}
                      </p>
                      <div>
                        <Badge color="success" pill className="mr-1">
                          {question.correct_answer}
                        </Badge>
                        {
                          question.incorrect_answers.map( incorrect_answer => (
                            <span key={incorrect_answer}>
                              <Badge color="primary" pill className="mr-1">
                                {incorrect_answer}
                              </Badge>
                            </span>
                          ))
                        }
                      </div>
                    </span>
                  ))}
                  </TabPane>
                  <TabPane tabId="plainTabs2">
                  {questionsP.map(question => (
                    <span key={question._id} onClick={() => this.toggleModal("notificationModal",question._id)}>
                      <p className="description">
                        {question.question}
                      </p>
                      <div>
                        <Badge color="success" pill className="mr-1">
                          {question.correct_answer}
                        </Badge>
                        {
                          question.incorrect_answers.map( incorrect_answer => (
                            <span key={incorrect_answer}>
                              <Badge color="primary" pill className="mr-1">
                                {incorrect_answer}
                              </Badge>
                            </span>
                          ))
                        }
                      </div>
                    </span>
                  ))}
                  </TabPane>
                  <TabPane tabId="plainTabs3">
                  {questionsM.map(question => (
                    <span key={question._id} onClick={() => this.toggleModal("notificationModal",question._id)}>
                      <p className="description">
                        {question.question}
                      </p>
                      <div>
                        <Badge color="success" pill className="mr-1">
                          {question.correct_answer}
                        </Badge>
                        {
                          question.incorrect_answers.map( incorrect_answer => (
                            <span key={incorrect_answer}>
                              <Badge color="primary" pill className="mr-1">
                                {incorrect_answer}
                              </Badge>
                            </span>
                          ))
                        }
                      </div>
                    </span>
                  ))}
                  </TabPane>
                  <TabPane tabId="plainTabs4">
                  {questionsT.map(question => (
                    <span key={question._id} onClick={() => this.toggleModal("notificationModal",question._id)}>
                      <p className="description">
                        {question.question}
                      </p>
                      <div>
                        <Badge color="success" pill className="mr-1">
                          {question.correct_answer}
                        </Badge>
                        {
                          question.incorrect_answers.map( incorrect_answer => (
                            <span key={incorrect_answer}>
                              <Badge color="primary" pill className="mr-1">
                                {incorrect_answer}
                              </Badge>
                            </span>
                          ))
                        }
                      </div>
                    </span>
                  ))}
                  </TabPane>
                </TabContent>
              </CardBody>
            </Card>
            <Modal
              className="modal-dialog-centered modal-danger"
              contentClassName="bg-gradient-danger"
              isOpen={this.state.notificationModal}
              toggle={() => this.toggleModal("notificationModal")}
            >
              <div className="modal-header">
                <h6 className="modal-title" id="modal-title-notification">
                  Atenção
                </h6>
                <button
                  aria-label="Close"
                  className="close"
                  data-dismiss="modal"
                  type="button"
                  onClick={() => this.toggleModal("notificationModal")}
                >
                  <span aria-hidden={true}>×</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="py-3 text-center">
                  <i className="ni ni-bell-55 ni-3x" />
                  <h4 className="heading mt-4">Deseja excluir essa pergunta?</h4>
                </div>
              </div>
              <div className="modal-footer">
                <Button className="btn-white" color="default" type="button" onClick={() => this.excluirQuestao()}>
                  Sim
                </Button>
                <Button className="btn-white" color="default" type="button" onClick={() => this.toggleModal("formModal",0,"edit")}>
                  Editar
                </Button>
                <Button
                  className="text-white ml-auto"
                  color="link"
                  data-dismiss="modal"
                  type="button"
                  onClick={() => this.toggleModal("notificationModal")}
                >
                  Fechar
                </Button>
              </div>
            </Modal>
          </Col>
        </Row>
      </>
    );
  }
}

export default TabsSection;
