import React, { useState } from 'react';
import { Listbox, ListboxItem } from "@nextui-org/react";
import { Card, CardHeader, CardBody, CardFooter, Divider, Link, } from "@nextui-org/react";
import "./Web.css"
import { Code } from "@nextui-org/react";
import { EditorView } from '@codemirror/view';
import { EditorState } from '@codemirror/state';
import CodeMirror from '@uiw/react-codemirror';
import { oneDark } from '@codemirror/theme-one-dark';



const hideCursorCSS = `
  .cm-cursor {
    display: none !important;
  }
`;

const items = [
  {
    key: "HOME",
    label: "HTML HOME",
  },
  {
    key: "copy",
    label: "Copy link",
  },
  {
    key: "edit",
    label: "Edit file",
  },
  {
    key: "delete",
    label: "Delete file",
  },

];

const Web = () => {

  const [selectedKey, setSelectedKey] = useState('HOME');

  const codeString = ";"

  const handleAction = (key) => {
    setSelectedKey(key);
  };

  return (
    <div className="flex ">
      <div className="w-80 border rounded-2 p-2 sticky top-0 h-screen overflow-y-auto">
        <h5 className="m-3">Topics</h5>
        <Listbox aria-label="Dynamic Actions" onAction={handleAction}>
          {items.map((item) => (
            <ListboxItem
              key={item.key}
              className={selectedKey === item.key ? 'bg-blue-500 text-white' : ''}

            >
              {item.label}
            </ListboxItem>
          ))}
        </Listbox>
        <h5 className="m-3">More Topics</h5>
      </div>

      <div className="flex-grow p-4 ">
        {selectedKey === 'HOME' && <div>  <Card className=" w-100 mycard">
          <CardHeader className="flex gap-3">
            <div className="flex flex-col">
              <p className="text-md">HTML is the standard markup language for Web pages.
                <br></br>
                With HTML you can create your own Website.
              </p>
            </div>
          </CardHeader>
          <Divider />
          <CardBody>
            <p>Make beautiful websites regardless of your design experience.</p>
          </CardBody>
          <Divider />
        </Card>
          <Card className="w-100 mycard">
            <CardHeader className="flex gap-3">
              <div className="flex flex-col">
                <p className="text-md">NextUI</p>
                <p className="text-small text-default-500">nextui.org</p>
              </div>
            </CardHeader>
            <Divider />
            <CardBody>
              <p>Make beautiful websites regardless of your design experience.</p>
            </CardBody>
            <Divider />
            <CardFooter>
              <Link
                isExternal
                showAnchorIcon
                href="https://github.com/nextui-org/nextui"
              >
                Visit source code on GitHub.
              </Link>
            </CardFooter>
          </Card>

        </div>}
        {selectedKey === 'copy' && <div><Card>
          <CardBody>
            <p>Make beautiful websites regardless of your design experience.</p>
          </CardBody>
        </Card></div>}
        {selectedKey === 'edit' && <div><div >
          <Card className="mb-3">
            <CardBody>
              <p>Make beautiful websites regardless of your design experience.</p>
            </CardBody>
          </Card>

          <Code color="primary" className='p-3' >npm install @nextui-org/react</Code>
        </div> </div>}
        {selectedKey === 'delete' && <div>
          <div>
            <style>{hideCursorCSS}</style>
            <CodeMirror
              value={codeString}
              theme={oneDark}
              extensions={[
                EditorView.lineWrapping,
                EditorState.readOnly.of(true), // Set the editor to read-only
              ]}
            />
          </div>
        </div>}
      </div>
    </div>
  );
};

export default Web;
