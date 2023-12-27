import { useState } from "react";
import "./App.css";
import EditTag from "./components/EditTag";
function App() {
  const [tags, setTags] = useState(["111", "222", "333"]);

  return (
    <>
      <div>
        <EditTag tags={tags} setTags={setTags}></EditTag>
      </div>
    </>
  );
}

export default App;
