import React from "react";

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
    CardHeader
} from "reactstrap";

class Question extends React.Component {
    state = {
        questions:[]
    };

    componentDidMount () {
        console.log(this.props.array);
        this.setState({ questions: this.props.array });
    }

    render(){

        const { questions } = this.state;

        return(
            <>
            {questions.map(question => (
                <span key={question._id}>
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
            </>
        );
    }
}

export default Question;
