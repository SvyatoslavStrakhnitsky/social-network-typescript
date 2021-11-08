import React, {ChangeEvent} from "react";

export class ProfileStatus extends React.Component<any> {

    state = {
        editMode: false,
        status: this.props.status,
    }

    activateEditMode = () => {
       this.setState({
           editMode: true,
       })
    }

    deactivateEditMode = () => {
        this.setState({
            editMode: false,
        })
        this.props.updateStatus(this.state.status)
    }

    onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            status: e.currentTarget.value
        })
    }

    render() {
        return (
            <div>
                {!this.state.editMode ?
                    <div>
                        <span onDoubleClick={this.activateEditMode}>{this.props.status || 'Update status'}</span>
                    </div>
                    :
                    <div>
                        <input type="text" value={this.state.status}
                               onChange={this.onStatusChange} onBlur={this.deactivateEditMode} autoFocus/>
                    </div>
                }
            </div>
        )
    }
}