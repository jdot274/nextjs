{\rtf1\ansi\ansicpg1252\cocoartf2820
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fnil\fcharset0 Menlo-Regular;}
{\colortbl;\red255\green255\blue255;\red183\green111\blue179;\red23\green23\blue23;\red202\green202\blue202;
\red140\green211\blue254;\red194\green126\blue101;\red70\green137\blue204;\red212\green214\blue154;\red67\green192\blue160;
\red109\green109\blue109;\red167\green197\blue152;}
{\*\expandedcolortbl;;\cssrgb\c77255\c52549\c75294;\cssrgb\c11765\c11765\c11765;\cssrgb\c83137\c83137\c83137;
\cssrgb\c61176\c86275\c99608;\cssrgb\c80784\c56863\c47059;\cssrgb\c33725\c61176\c83922;\cssrgb\c86275\c86275\c66667;\cssrgb\c30588\c78824\c69020;
\cssrgb\c50196\c50196\c50196;\cssrgb\c70980\c80784\c65882;}
\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\deftab720
\pard\pardeftab720\partightenfactor0

\f0\fs24 \cf2 \cb3 \expnd0\expndtw0\kerning0
\outl0\strokewidth0 \strokec2 import\cf4 \strokec4  \cf5 \strokec5 React\cf4 \strokec4 , \{ \cf5 \strokec5 useRef\cf4 \strokec4  \} \cf2 \strokec2 from\cf4 \strokec4  \cf6 \strokec6 'react'\cf4 \strokec4 ;\cb1 \
\cf2 \cb3 \strokec2 import\cf4 \strokec4  \{ \cf5 \strokec5 Canvas\cf4 \strokec4  \} \cf2 \strokec2 from\cf4 \strokec4  \cf6 \strokec6 '@react-three/fiber'\cf4 \strokec4 ;\cb1 \
\cf2 \cb3 \strokec2 import\cf4 \strokec4  \{ \cf5 \strokec5 OrbitControls\cf4 \strokec4  \} \cf2 \strokec2 from\cf4 \strokec4  \cf6 \strokec6 '@react-three/drei'\cf4 \strokec4 ;\cb1 \
\cf2 \cb3 \strokec2 import\cf4 \strokec4  \cf5 \strokec5 GridSphere\cf4 \strokec4  \cf2 \strokec2 from\cf4 \strokec4  \cf6 \strokec6 './GridSphere'\cf4 \strokec4 ;\cb1 \
\
\pard\pardeftab720\partightenfactor0
\cf7 \cb3 \strokec7 const\cf4 \strokec4  \cf8 \strokec8 Sphere\cf4 \strokec4 : \cf9 \strokec9 React\cf4 \strokec4 .\cf9 \strokec9 FC\cf4 \strokec4  = () \cf7 \strokec7 =>\cf4 \strokec4  \{\cb1 \
\pard\pardeftab720\partightenfactor0
\cf4 \cb3   \cf2 \strokec2 return\cf4 \strokec4  (\cb1 \
\cb3     \cf10 \strokec10 <\cf7 \strokec7 div\cf4 \strokec4  \cf5 \strokec5 className\cf4 \strokec4 =\cf6 \strokec6 "fixed top-[45%] left-[calc(55%-2px)] -translate-x-1/2 -translate-y-1/2 z-20 scale-[0.6] sm:scale-[0.7] md:scale-[0.8] lg:scale-100"\cf10 \strokec10 >\cf4 \cb1 \strokec4 \
\cb3       \cf10 \strokec10 <\cf7 \strokec7 div\cf4 \strokec4  \cf5 \strokec5 className\cf4 \strokec4 =\cf6 \strokec6 "relative w-[600px] h-[600px] max-w-[100vw]"\cf10 \strokec10 >\cf4 \cb1 \strokec4 \
\cb3         \cf10 \strokec10 <\cf9 \strokec9 Canvas\cf4 \strokec4  \cb1 \
\cb3           \cf5 \strokec5 camera\cf4 \strokec4 =\cf7 \strokec7 \{\cf4 \strokec4 \{ \cf5 \strokec5 position:\cf4 \strokec4  [\cf11 \strokec11 0\cf4 \strokec4 , \cf11 \strokec11 0\cf4 \strokec4 , \cf11 \strokec11 4\cf4 \strokec4 ], \cf5 \strokec5 fov:\cf4 \strokec4  \cf11 \strokec11 45\cf4 \strokec4  \}\cf7 \strokec7 \}\cf4 \cb1 \strokec4 \
\cb3           \cf5 \strokec5 style\cf4 \strokec4 =\cf7 \strokec7 \{\cf4 \strokec4 \{ \cf5 \strokec5 background:\cf4 \strokec4  \cf6 \strokec6 'transparent'\cf4 \strokec4 , \cf5 \strokec5 width:\cf4 \strokec4  \cf6 \strokec6 '100%'\cf4 \strokec4 , \cf5 \strokec5 height:\cf4 \strokec4  \cf6 \strokec6 '100%'\cf4 \strokec4  \}\cf7 \strokec7 \}\cf4 \cb1 \strokec4 \
\cb3         \cf10 \strokec10 >\cf4 \cb1 \strokec4 \
\cb3           \cf10 \strokec10 <\cf9 \strokec9 ambientLight\cf4 \strokec4  \cf5 \strokec5 intensity\cf4 \strokec4 =\cf7 \strokec7 \{\cf11 \strokec11 0.5\cf7 \strokec7 \}\cf4 \strokec4  \cf10 \strokec10 />\cf4 \cb1 \strokec4 \
\cb3           \cf10 \strokec10 <\cf9 \strokec9 pointLight\cf4 \strokec4  \cf5 \strokec5 position\cf4 \strokec4 =\cf7 \strokec7 \{\cf4 \strokec4 [\cf11 \strokec11 10\cf4 \strokec4 , \cf11 \strokec11 10\cf4 \strokec4 , \cf11 \strokec11 10\cf4 \strokec4 ]\cf7 \strokec7 \}\cf4 \strokec4  \cf5 \strokec5 intensity\cf4 \strokec4 =\cf7 \strokec7 \{\cf11 \strokec11 2\cf7 \strokec7 \}\cf4 \strokec4  \cf5 \strokec5 color\cf4 \strokec4 =\cf6 \strokec6 "#0088ff"\cf4 \strokec4  \cf10 \strokec10 />\cf4 \cb1 \strokec4 \
\cb3           \cf10 \strokec10 <\cf9 \strokec9 pointLight\cf4 \strokec4  \cf5 \strokec5 position\cf4 \strokec4 =\cf7 \strokec7 \{\cf4 \strokec4 [-\cf11 \strokec11 10\cf4 \strokec4 , -\cf11 \strokec11 10\cf4 \strokec4 , -\cf11 \strokec11 10\cf4 \strokec4 ]\cf7 \strokec7 \}\cf4 \strokec4  \cf5 \strokec5 intensity\cf4 \strokec4 =\cf7 \strokec7 \{\cf11 \strokec11 2\cf7 \strokec7 \}\cf4 \strokec4  \cf5 \strokec5 color\cf4 \strokec4 =\cf6 \strokec6 "#0044ff"\cf4 \strokec4  \cf10 \strokec10 />\cf4 \cb1 \strokec4 \
\cb3           \cb1 \
\cb3           \cf10 \strokec10 <\cf9 \strokec9 GridSphere\cf4 \strokec4  \cf10 \strokec10 />\cf4 \cb1 \strokec4 \
\cb3           \cb1 \
\cb3           \cf10 \strokec10 <\cf9 \strokec9 OrbitControls\cf4 \cb1 \strokec4 \
\cb3             \cf5 \strokec5 enableZoom\cf4 \strokec4 =\cf7 \strokec7 \{false\}\cf4 \cb1 \strokec4 \
\cb3             \cf5 \strokec5 enablePan\cf4 \strokec4 =\cf7 \strokec7 \{false\}\cf4 \cb1 \strokec4 \
\cb3             \cf5 \strokec5 autoRotate\cf4 \cb1 \strokec4 \
\cb3             \cf5 \strokec5 autoRotateSpeed\cf4 \strokec4 =\cf7 \strokec7 \{\cf11 \strokec11 0.5\cf7 \strokec7 \}\cf4 \cb1 \strokec4 \
\cb3           \cf10 \strokec10 />\cf4 \cb1 \strokec4 \
\cb3         \cf10 \strokec10 </\cf9 \strokec9 Canvas\cf10 \strokec10 >\cf4 \cb1 \strokec4 \
\cb3       \cf10 \strokec10 </\cf7 \strokec7 div\cf10 \strokec10 >\cf4 \cb1 \strokec4 \
\cb3     \cf10 \strokec10 </\cf7 \strokec7 div\cf10 \strokec10 >\cf4 \cb1 \strokec4 \
\cb3   );\cb1 \
\cb3 \};\cb1 \
\
\pard\pardeftab720\partightenfactor0
\cf2 \cb3 \strokec2 export\cf4 \strokec4  \cf2 \strokec2 default\cf4 \strokec4  \cf5 \strokec5 Sphere\cf4 \strokec4 ;\cb1 \
}