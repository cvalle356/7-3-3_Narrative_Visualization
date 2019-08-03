# 7-3-3_Narrative_Visualization
Course project for CS 498 Data Visualization
Narrative Visualization Essay
CS 498 Data Visualization
Carlos Valle Summer 2019

Link to Narrative Visualization: https://cvalle356.github.io/7-3-3_Narrative_Visualization/page01.html

We were asked to create a visualization using the narrative form. I used data obtained from the St. Louis and New York Feds and from the Census Bureau. The resources used to produce the narrative visualization are displayed at the end of this report. 

Messaging. The purpose of this visualization is to look at microeconomic data as an indicator of recession. The inverted yield curve has historically been a somewhat reliable leading indicator of recession. This visualization starts with a look a chart of the recessions since the 1970s and overlays the 10-year minus 2-year bond maturity rate index (yield curve). Typically, long term investments yield a higher rate of return than short term investments. In periods right before recession, these invert indicating investors are not as optimistic about the US economic outlook. The first scene introduces us to investment patterns that can be used to anticipate a period of recession. The second scene introduces us to micro patterns that may give us some insight into this as well. Specifically, it looks at median household debt and income. There are economist that believe a great proportion of Americans do not make enough to cover their ongoing expenses and go through periods of borrowing to cover their ongoing expense. When they can’t borrow any more, they start becoming delinquent on debts. This is well documented moving into the Great Recession of 00’s. The second slides (via a html select) looks at the US median debt-to-income ratio and asks whether the reader thinks recession is imminent.  The next scene looks at this at the state level. It allows you to add states to compare. It starts with California, because that is where I am from.

Narrative Structure. I chose to develop my narrative visualization using the martini glass narrative structure. The visualization starts broad (US investment patters), narrows (household debt income to debt-to-income ratio), then allows the user to freely explore state level data. The second scene has a drill-down but it is a continuation of the narrowing rather than exploration. The last part of the structure allows for drill-down exploration. The martini glass structure allows for some linearity along a message while giving the user some ability to drive the content.

Visual Structure. I chose line graphs because the measurements of continuous variables were repeated across time. Time is linear (continuous) and the measurement intervals varied (continuous), so the smoothing of the lines would communicate the phenomena models well. I used transitions while drawing the lines to simulate time. The recession (important parts of each scene) period were shaded sections (rect element) of the x axis. The rects were static and you could see the simulation and anticipate the recession period so you can get an idea of the behavior of the particular index being simulated. For navigational elements, I used simple html buttons with arrows indicating the directionality and these stayed static across the scenes. I used a paragraph to explain the chart and called out the drop-down menus as needed (located below text). I developed it using these elements to help orient the user so they can know what to expect and where they are.

Scenes. To support the martini glass structure described in the above paragraph, I used three pages to serve as scenes. The first scene was the broadest. It displayed US level investment patterns that can serve as a warning of recession. The second scene introduced the household level debt and income and their ratio which serves as a summary for the multiple data points (total debt and income). The third scene allows the user explore the median household debt-to-income (dti) for each state. The summary dti works nicely to compare across states. Using dti allows us to draw one line per state and still retain the information that the first drawing in scene two gives us. 

Annotations. The annotations used are primarily given using the buttons. They give you a quick way to see what is coming. There is a quick paragraph that accompanies each scene as well that prompt the user of the tooltips and drop-down menu which allows them to interact with the data. The annotations help support the structure and message by clarifying what the graphs are communicating and why the following graphs are necessary. Annotations like the tooltip and line labels are dynamic and change with user interaction in a single scene.

Parameters. The first scene is made up using different data than the following slides that allow for exploration. They were all built using a similar visual structure and represent measurements of the health of the US economy. The second scene uses a household level data set but is transformed into a single variable for summarization. Once this is summarized into debt-to-income (dti), I used state level dtis and state abbreviation to add a data (filtered by state abbreviation). The exploration scene makes heavy use of this parameter for exploration. 

Triggers. My visualization used html buttons, select drop-down menus, and a tooltip. Accordances were provided in the visual presentation of the button and visual separation of the drop-down menus used for interaction. I used bootstrap to apply a css to the button which many users are familiar. The drop-down menus were separated from the text so they can be easily seen. The user was prompted to use the tooltip via the text in the narrative. Buttons were used to navigate between scenes and drop-downs between graphs. 


Data Resources:
https://blockbuilder.org/officeofjane/8092eaec170663cadea5da1647ca77aa
https://fred.stlouisfed.org/series/JHDUSRGDPBR
https://fred.stlouisfed.org/series/MEHOINUSA672N
https://www.newyorkfed.org/microeconomics/databank.html
D3 Code for Charts
http://jsfiddle.net/spanndemic/5JRMt/
http://bl.ocks.org/biovisualize/1016860
