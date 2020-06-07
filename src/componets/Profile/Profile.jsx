import s from "./Profile.module.css";
import React from "react";


class Profile extends React.Component {

    state = {
        editMode: false,
        status: this.props.status

    };

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.status !== this.props.status) {
            this.setState({status: this.props.status})
        }
    }

    activateEditMode = () => {
        this.setState( {editMode: true} );

    };

    deactivateEditMode = () => {
        this.setState( {editMode: false} );
        this.props.updateMyStatus(this.state.status);
    };

    onChangeInput = (e) => {
          this.setState( {status: e.currentTarget.value})
    };

    render() {

        return (
            <div className={s.profile_card}>
                <img className={s.profile_photo}
                     src="https://avatars2.githubusercontent.com/u/23550189?s=400&v=4"
                     alt=""/>
                <h5>Sergey Neplashov</h5>
                <div className={s.status}>
                    {!this.state.editMode &&
                        <span className={s.statusTitle} onDoubleClick={this.activateEditMode}>{ this.state.status }</span>
                    }
                    {this.state.editMode &&
                    <input onChange={this.onChangeInput} autoFocus={true} onBlur={this.deactivateEditMode} value={ this.state.status } type="text"/>
                    }

                </div>
                {/*<div>*/}
                {/*    <ul className={s.my_profile}>*/}
                {/*        <li>Date of Birth: 05.08.1991</li>*/}
                {/*        <li>City: Slavgorod</li>*/}
                {/*        <li>Education: GGU Skoriny</li>*/}
                {/*    </ul>*/}
                {/*</div>*/}

            </div>
        );
    }
}

export default Profile;