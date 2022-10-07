import React from "react";

import { Typography, Tag, Accordion } from "neetoui";
import { Link } from "react-router-dom";

import { SIDEBAR_CATEGORY_DATA } from "./constant";

const Article = () => (
  <div className="flex">
    <Accordion
      className="border-r h-full w-1/4 px-5"
      defaultActiveKey={1}
      iconPosition="start"
    >
      {SIDEBAR_CATEGORY_DATA.map(item => (
        <Accordion.Item key={item.id} title={item.category}>
          {item.articles.map(article => (
            <Link
              className="text-gray-500"
              key={article.slug}
              to={`/public/${article.slug}`}
            >
              {article.title}
            </Link>
          ))}
        </Accordion.Item>
      ))}
    </Accordion>
    <div className="mt-5 w-3/4 px-5">
      <Typography style="h1">Setting up an account in Scribble</Typography>
      <div className="mt-3 flex">
        <Tag label="Getting Started" size="small" />
        <Typography className="ml-5 text-gray-600" style="body3">
          22 October, 2021
        </Typography>
      </div>
      <Typography className="mt-6" style="body2">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
        finibus justo et nunc posuere, id eleifend tortor dictum. Duis sagittis,
        ipsum sed ultricies blandit, tortor lacus fringilla ipsum, non iaculis
        justo massa tincidunt augue. Nam ac elit augue. Phasellus ac scelerisque
        odio. Donec tempus tortor sit amet enim tempus, eget pellentesque odio
        cursus. Sed porta finibus ante in malesuada. Nam vel massa condimentum
        metus dapibus eleifend. Quisque gravida id risus quis interdum. Cras
        rutrum ac neque sit amet hendrerit. Aenean volutpat accumsan volutpat.
        Aliquam erat volutpat. Maecenas congue, mi at consectetur vehicula, quam
        orci sollicitudin diam, ac ornare urna dui vel metus. Aenean rhoncus
        felis et massa aliquam pellentesque. Donec dictum laoreet justo. Morbi
        rutrum fringilla ante, ac efficitur orci. Quisque risus ipsum, hendrerit
        sit amet enim non, lobortis ultrices enim. Donec commodo tempor tellus a
        commodo. Integer mollis enim in iaculis sodales. Vivamus placerat dui
        nec elit sodales fermentum. Vivamus venenatis aliquet arcu, id posuere
        diam pellentesque non. In commodo faucibus velit ut rhoncus. Mauris
        cursus volutpat diam, sit amet accumsan ante elementum eu. Integer
        interdum augue sed vestibulum fermentum. Nulla feugiat ut nisl in
        mattis. Fusce varius aliquam turpis, vel sodales justo pretium eget.
        Nullam ultrices ultrices ex, in commodo velit sagittis in. Nunc lacinia
        eleifend magna sed laoreet. Duis ornare id mi quis tempor. Vestibulum in
        tempor libero. Fusce sed laoreet justo. Morbi efficitur urna sed ornare
        finibus. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Quisque eros lacus, porttitor consequat lorem et, pretium tristique
        ante. Aliquam consectetur ultricies urna, et sagittis massa ullamcorper
        sed. Etiam facilisis, dui id semper gravida, libero est porttitor justo,
        in laoreet ante ante vel urna. Fusce id diam fermentum, iaculis ante ac,
        maximus diam. Morbi laoreet ipsum justo, vel euismod elit lacinia eu. Ut
        massa felis, ullamcorper ullamcorper semper nec, tempor vel nibh.
        Phasellus consectetur aliquet quam, facilisis sollicitudin ex consequat
        eget. Suspendisse fermentum tellus tellus, nec finibus erat malesuada
        eget. In vitae condimentum lacus. Vestibulum in ultricies libero. Sed
        sollicitudin lacus magna, non porta nunc finibus a. Fusce lobortis ut
        est ac auctor. Sed non nisl id tortor ultrices tincidunt sed ut leo.
        Phasellus eget nisi quam. Morbi mollis metus a purus viverra, in
        suscipit libero pellentesque. Lorem ipsum dolor sit amet, consectetur
        adipiscing elit. Integer sit amet arcu in tellus ultrices pellentesque.
        Sed ornare laoreet quam id egestas.
      </Typography>
    </div>
  </div>
);

export default Article;
