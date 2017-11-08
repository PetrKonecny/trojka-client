import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form'
import {
  Checkbox,
  RadioButtonGroup,
  SelectField,
  TextField,
  Toggle,
  DatePicker,
  TimePicker
} from 'redux-form-material-ui'
import RadioButton from 'material-ui/RadioButton';
import RaisedButton from 'material-ui/RaisedButton';

export class EventForm extends Component {


  render() {
    const {handleSubmit} = this.props
    return (
       <form onSubmit={ handleSubmit }>
        <div className="event-form-date">
          <Field className="unstyled" name="date" hintText="datum akce" component={TextField} type="date" />
        </div>
        <div>
          <Field className="unstyled" name="time" component={TextField} type="time" floatingLabelText="začátek akce" floatingLabelFixed={true}/>
        </div>
        <div>
          <Field className="unstyled" name="time_preparation" props={{format: "24hr"}} component={TextField} type="time" floatingLabelText="začátek akce (včetně chystání)" floatingLabelFixed={true}/>
        </div>
        <div>
          <Field name="name" hintText="název akce" component={TextField} />
        </div>  
        <div>
          <Field name="link" hintText="odkaz na web/facebook" component={TextField} />
        </div>
        <div>
          <Field name="count" hintText="předpokádaný počet osob" type="number" component={TextField} />
        </div>
        <div>
        <h4>Typ akce</h4>
        <Field name="type" component={RadioButtonGroup}>
          <RadioButton value="koncert" label="koncert"/>
          <RadioButton value="divadlo" label="divadlo"/>
          <RadioButton value="unpluged" label="unplugged"/>
          <RadioButton value="vecirek" label="večírek"/>
          <RadioButton value="lekce" label="přednáška"/>
          <RadioButton value="projekce" label="projekce"/>
          <RadioButton value="vernisaz" label="vernisáž"/>
        </Field>
        </div>
        <div>
        <h4>Místo akce</h4>
        <Field name="place" component={RadioButtonGroup}>
          <RadioButton disabled={this.props.disabled && this.props.disabled.find((place)=>place == "Sál") != null} value="sal" label="sál"/>
          <RadioButton disabled={this.props.disabled && this.props.disabled.find((place)=>place == "Nádvoří") != null} value="kavarna" label="kavárna"/>
          <RadioButton disabled={this.props.disabled && this.props.disabled.find((place)=>place == "Kavárna") != null} value="nadvori" label="nádvoří"/>
          <RadioButton disabled={this.props.disabled && this.props.disabled.find((place)=>place == "Mínus trojka") != null} value="minus_trojka" label="mínus trojka"/>
        </Field>
        <div style={{opacity: '0.3', 'marginTop': '16'}}>
        {this.props.disabled && "Některá místa nejsou dostupná, protože zde už nějaká akce v tomto datu probíhá"}
        </div>
        </div>
        <div>
          <Field name="anotation" hintText="anotace" multiLine={true} rows={4} component={TextField} floatingLabelText="anotace"/>
        </div>
        <div>
          <Field name="anotation_poster" hintText="kratší anotace (na plakát)" multiLine={true} rows={2} component={TextField} floatingLabelText="kratší anotace (na plakát)" />
        </div>
        <div>
        <h4>Projektor</h4>
        <Field name="projector" component={RadioButtonGroup}>
          <RadioButton value="1" label="ano"/>
          <RadioButton value="0" label="ne"/>
        </Field>
        </div>
        <div>
        <h4>Zastupováno OSA</h4>
        <Field name="osa" component={RadioButtonGroup}>
          <RadioButton value="1" label="ano"/>
          <RadioButton value="0" label="ne"/>
        </Field>
        </div>
        <div>
        <h4>Osvětlení</h4>
        <Field name="lights" component={RadioButtonGroup}>
          <RadioButton value="0" label="základní"/>
          <RadioButton value="1" label="rozšířené"/>
        </Field>
        <Field name="lights_more" hintText="poznámky k osvětlení" multiLine={true} rows={2} component={TextField} floatingLabelText="poznámky k osvětlení" />
        </div>
        <div>
        <h4>Zvukař</h4>
        <Field name="sound" component={RadioButtonGroup}>
          <RadioButton value="1" label="ano"/>
          <RadioButton value="0" label="ne"/>
        </Field>
        <Field name="sound_more" hintText="poznámky ke zvuku" multiLine={true} rows={2} component={TextField} floatingLabelText="poznámky ke zvuku" />
        </div>
        <div>
          <Field name="contact" hintText="zodpovědná osoba" component={TextField} />
        </div>  
        <div>
          <Field name="org" hintText="organizace" component={TextField} />
        </div>  
        <div>
          <Field name="mail" hintText="email" component={TextField} />
        </div>  
        <div>
          <Field name="phone" hintText="telefon" component={TextField} />
        </div>  
        <RaisedButton type='submit' label="Odeslat" disabled={this.props.submitDisabled} secondary={true} />
      </form>
    )
  }
}

function validate(values) { 
  const errors = {};
  if (!values.eventDate) {
  errors.eventDate = 'Zadejte datum';
  }
  if (!values.time) {
  errors.time = 'Zadejte čas';
  }
  if(!values.time_preparation) {
  errors.time_preparation = 'Zadejte čas';
  }
  if(!values.name || values.name.trim() === ''){
  errors.name = "Zadejte název"
  }
  if(!values.place || values.place.trim() === ''){
  errors.place = "Vyberte místo"
  }
  if(!values.light || values.light.trim() === ''){
  errors.light = "Vyberte světla"
  }
  if(!values.sound || values.sound.trim() === ''){
  errors.sound = "Vyberte zvuk"
  }
  if(!values.type || values.type.trim() === ''){
  errors.type = "Vyberte typ"
  }
  if(!values.mail || values.mail.trim() === ''){
  errors.mail = "Zadejte email"
  }
  if(!values.phone || values.phone.trim() === ''){
  errors.phone = "Zadejte kontaktní telefon"
  }
  if(!values.contact || values.contact.trim() === ''){
  errors.contact = "Zadejte kontaktní osobu"
  }
  return errors;
}

export default reduxForm({
  form: 'event', 
  validate
})(EventForm)


