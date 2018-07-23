var React = require("react");

class Edit extends React.Component {
  render() {
    return (
      <html>
        <head />
        <body>
          <h4>Editing: {this.props.pokemon.name}</h4>
          <form
            className="pokemon-form"
            method="POST"
            action={"/edit/"+ this.props.pokemon.id + "?_method=PUT"}
          >
            <div className="pokemon-attribute">
              name:<input
                name="name"
                type="text"
                defaultValue={this.props.pokemon.name}
              />
            </div>
            <div className="pokemon-attribute">
              height:<input
                name="height"
                type="text"
                defaultValue={this.props.pokemon.height}
              />
            </div>
            <input name="submit" type="submit" />
          </form>
        </body>
      </html>
    );
  }
}

module.exports = Edit;
