import Cluster from "./cluster";

function numary() : Cluster {
  return new Cluster({});
}

// export default Cluster;
export = Cluster;

exports = {
  numary,
  Cluster,
}