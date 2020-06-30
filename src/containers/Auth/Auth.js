import React, { Component } from 'react';
import classes from './Auth.module.scss';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import is from 'is_js'; // для валидации email

export default class Auth extends Component {
  state = {
    isFormValid: false,
    formControls: {
      email: {
        value: '',
        type: 'email',
        label: 'Email',
        errorMessage: 'Введите корректный email',
        valid: false,
        touched: false, // был ли затронут input или нет
        validation: {
          // правила валидации
          required: true,
          email: true,
        },
      },
      password: {
        value: '',
        type: 'password',
        label: 'Пароль',
        errorMessage: 'Введите корректный пароль',
        valid: false,
        touched: false, // был ли затронут input или нет
        validation: {
          // правила валидации
          required: true,
          minLength: 6,
        },
      },
    },
  };

  loginHandler = () => {};

  registerHandler = () => {};

  submitHandler = (event) => {
    event.preventDefault();
  };

  validateControl(value, validation) {
    if (!validation) {
      return true;
    }

    let isValid = true;

    if (validation.required) {
      // не пустая строка и предыдущее значение true - то true:
      isValid = value.trim() !== '' && isValid;
    }

    if (validation.email) {
      // валидация email и пред значение true - то true:
      isValid = is.email(value) && isValid;
    }

    if (validation.minLength) {
      // нужное количество символов и пред значение true - то true:
      isValid = value.length >= validation.minLength && isValid;
    }

    return isValid;
  }

  onChangeHandler = (event, controlName) => {
    // создаем копию state:
    const formControls = { ...this.state.formControls };
    const control = { ...formControls[controlName] };

    // переопределяем копию state:
    control.value = event.target.value;
    control.touched = true;
    control.valid = this.validateControl(control.value, control.validation); // введенное значение и объект конфигурации

    formControls[controlName] = control;

    let isFormValid = true;

    // если все input'ы прошли валидацию - то форма валидна:
    Object.keys(formControls).forEach((name) => {
      isFormValid = formControls[name].valid && isFormValid;
    });

    // изменяем state:
    this.setState({
      formControls, // formControls: formControls
      isFormValid, // isFormValid: isFormValid
    });
  };

  renderInputs() {
    // получаем массив из ключей объекта = [email, password] :
    return Object.keys(this.state.formControls).map((controlName, index) => {
      const control = this.state.formControls[controlName];

      return (
        <Input
          key={controlName + index}
          type={control.type}
          value={control.value}
          valid={control.valid}
          touched={control.touched}
          label={control.label}
          shouldValidate={!!control.validation} // !! - приводит объект к будевому значению (true - если объект не пустой)
          errorMessage={control.errorMessage}
          onChange={(event) => this.onChangeHandler(event, controlName)}
        />
      );
    });
  }

  render() {
    return (
      <div className={classes.Auth}>
        <div>
          <h1>Auth</h1>

          <form onSubmit={this.submitHandler} className={classes.AuthForm}>
            {this.renderInputs()}

            <Button
              type='success'
              onClick={this.loginHandler}
              disabled={!this.state.isFormValid}
            >
              Войти
            </Button>
            <Button
              type='primary'
              onClick={this.registerHandler}
              disabled={!this.state.isFormValid}
            >
              Зарегистрироваться
            </Button>
          </form>
        </div>
      </div>
    );
  }
}
