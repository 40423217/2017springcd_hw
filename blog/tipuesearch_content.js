var tipuesearch = {"pages":[{"tags":"misc","title":"About","url":"./pages/about/","text":"2017Spring 機械設計工程系協同產品設計實習 課程倉儲: http://github.com/mdecourse/2017springcd 課程投影片: http://mdecourse.github.io/2017springcd 課程網誌: http://mdecourse.github.io/2017springcd/blog"},{"tags":"40423217","title":"W15練習","url":"./w15lian-xi.html","text":"window.onload=function(){ // 設定 data/py 為共用程式路徑 brython({debug:1, pythonpath:['./../data/py']}); } from browser import document as doc import math # deg 為角度轉為徑度的轉換因子 deg = math.pi/180. # 定義 Spur 類別 class Spur(object): def __init__(self, ctx): self.ctx = ctx def create_line(self, x1, y1, x2, y2, width=3, fill=\"red\"): self.ctx.beginPath() self.ctx.lineWidth = width self.ctx.moveTo(x1, y1) self.ctx.lineTo(x2, y2) self.ctx.strokeStyle = fill self.ctx.stroke() # # 定義一個繪正齒輪的繪圖函式 # midx 為齒輪圓心 x 座標 # midy 為齒輪圓心 y 座標 # rp 為節圓半徑, n 為齒數 # pa 為壓力角 (deg) # rot 為旋轉角 (deg) # 已經針對 n 大於等於 52 齒時的繪圖錯誤修正, 因為 base circle 與齒根圓大小必須進行判斷 def Gear(self, midx, midy, rp, n=20, pa=20, color=\"black\"): # 齒輪漸開線分成 15 線段繪製 imax = 15 # 在輸入的畫布上繪製直線, 由圓心到節圓 y 軸頂點畫一直線 self.create_line(midx, midy, midx, midy-rp) # 畫出 rp 圓, 畫圓函式尚未定義 #create_oval(midx-rp, midy-rp, midx+rp, midy+rp, width=2) # a 為模數 (代表公制中齒的大小), 模數為節圓直徑(稱為節徑)除以齒數 # 模數也就是齒冠大小 a=2*rp/n # d 為齒根大小, 為模數的 1.157 或 1.25倍, 這裡採 1.25 倍 d=2.5*rp/n # ra 為齒輪的外圍半徑 ra=rp+a # 畫出 ra 圓, 畫圓函式尚未定義 #create_oval(midx-ra, midy-ra, midx+ra, midy+ra, width=1) # rb 則為齒輪的基圓半徑 # 基圓為漸開線長齒之基準圓 rb=rp*math.cos(pa*deg) # 畫出 rb 圓 (基圓), 畫圓函式尚未定義 #create_oval(midx-rb, midy-rb, midx+rb, midy+rb, width=1) # rd 為齒根圓半徑 rd=rp-d # 當 rd 大於 rb 時, 漸開線並非畫至 rb, 而是 rd # 畫出 rd 圓 (齒根圓), 畫圓函式尚未定義 #create_oval(midx-rd, midy-rd, midx+rd, midy+rd, width=1) # dr 則為基圓到齒頂圓半徑分成 imax 段後的每段半徑增量大小 # 將圓弧分成 imax 段來繪製漸開線 # 當 rd 大於 rb 時, 漸開線並非畫至 rb, 而是 rd if rd>rb: dr = (ra-rd)/imax else: dr=(ra-rb)/imax # tan(pa*deg)-pa*deg 為漸開線函數 sigma=math.pi/(2*n)+math.tan(pa*deg)-pa*deg for j in range(n): ang=-2.*j*math.pi/n+sigma ang2=2.*j*math.pi/n+sigma lxd=midx+rd*math.sin(ang2-2.*math.pi/n) lyd=midy-rd*math.cos(ang2-2.*math.pi/n) for i in range(imax+1): # 當 rd 大於 rb 時, 漸開線並非畫至 rb, 而是 rd if rd>rb: r=rd+i*dr else: r=rb+i*dr theta=math.sqrt((r*r)/(rb*rb)-1.) alpha=theta-math.atan(theta) xpt=r*math.sin(alpha-ang) ypt=r*math.cos(alpha-ang) xd=rd*math.sin(-ang) yd=rd*math.cos(-ang) # i=0 時, 繪線起點由齒根圓上的點, 作為起點 if(i==0): last_x = midx+xd last_y = midy-yd # 由左側齒根圓作為起點, 除第一點 (xd,yd) 齒根圓上的起點外, 其餘的 (xpt,ypt)則為漸開線上的分段點 self.create_line((midx+xpt),(midy-ypt),(last_x),(last_y),fill=color) # 最後一點, 則為齒頂圓 if(i==imax): lfx=midx+xpt lfy=midy-ypt last_x = midx+xpt last_y = midy-ypt # the line from last end of dedendum point to the recent # end of dedendum point # lxd 為齒根圓上的左側 x 座標, lyd 則為 y 座標 # 下列為齒根圓上用來近似圓弧的直線 self.create_line((lxd),(lyd),(midx+xd),(midy-yd),fill=color) for i in range(imax+1): # 當 rd 大於 rb 時, 漸開線並非畫至 rb, 而是 rd if rd>rb: r=rd+i*dr else: r=rb+i*dr theta=math.sqrt((r*r)/(rb*rb)-1.) alpha=theta-math.atan(theta) xpt=r*math.sin(ang2-alpha) ypt=r*math.cos(ang2-alpha) xd=rd*math.sin(ang2) yd=rd*math.cos(ang2) # i=0 時, 繪線起點由齒根圓上的點, 作為起點 if(i==0): last_x = midx+xd last_y = midy-yd # 由右側齒根圓作為起點, 除第一點 (xd,yd) 齒根圓上的起點外, 其餘的 (xpt,ypt)則為漸開線上的分段點 self.create_line((midx+xpt),(midy-ypt),(last_x),(last_y),fill=color) # 最後一點, 則為齒頂圓 if(i==imax): rfx=midx+xpt rfy=midy-ypt last_x = midx+xpt last_y = midy-ypt # lfx 為齒頂圓上的左側 x 座標, lfy 則為 y 座標 # 下列為齒頂圓上用來近似圓弧的直線 self.create_line(lfx,lfy,rfx,rfy,fill=color) canvas = doc['onegear'] ctx = canvas.getContext(\"2d\") x = (canvas.width)/2 y = (canvas.height)/2 r = 0.8*(canvas.height/2) # 齒數 n = 36 # 壓力角 pa = 20 Spur(ctx).Gear(x, y, r, n, pa, \"blue\") # 以下列出 W11 2B 與 2A 未出席人數 data = open(\"./../data/w11/2b0503.txt\", encoding=\"utf-8\").read() data1 = open(\"./../data/w11/2a0504.txt\", encoding=\"utf-8\").read() count = 0 count1 = 0 # 去掉前面兩列 student = data.split(\"\\n\")[2:] student1 = data1.split(\"\\n\")[2:] for i in range(len(student)): each = student[i].split(\"\\t\") # 請注意, Brython 在 Windows 環境無法正確判定字串, 原因不明 if each[1] != \"出席\": count = count + 1 for i in range(len(student1)): each1 = student1[i].split(\"\\t\") if each1[1] != \"present\": count1 = count1 + 1 div = doc[\"onegear_div\"] div <= \"2b: \" + str(count) + \"/\" + str(len(student)) + \"|\" + \"2a: \" + str(count1) + \"/\" + str(len(student1))"},{"tags":"40423217","title":"2017Spring_CD_Involute&Involute;_Gear","url":"./2017spring_cd_involuteinvolute_gear.html","text":"介紹課程大綱 本單元是利用 SolveSpace 繪製 Involute & Involute_Gear 利用 SolveSpace 繪製 Involute (漸開線) SolveSpace_Involute_Part1 漸開線繪製原理說明 SolveSpace_Involute_Part1 from 40423217 on Vimeo . SolveSpace_Involute_Part2 導入漸開線繪製出漸開線正齒輪 SolveSpace_Involute_Part2 from 40423217 on Vimeo . 利用 SolveSpace 繪製 Involute_Gear (漸開線齒輪) SolveSpace_Involute_Gear_part1 漸開線齒輪 Data 建立，利用繪製漸開線時建立的 Data 完成漸開線齒輪繪製 模數 壓力角 齒數 (轉位係數) SolveSpace_Involute_Gear_part1 from 40423217 on Vimeo . SolveSpace_Involute_Gear_part2 SolveSpace_Involute_Gear_part2 from 40423217 on Vimeo ."},{"tags":"40423217","title":"Midterm_test_n3","url":"./midterm_test_n3.html","text":"使用py進行有效率的分組 Fourbar Walker OnShape 零件協同繪圖與組立 Part1_利用Solvespace建立機構架構 NFU_MDE_2017SpringCD_MidtermN3_40423217_Part1.mp4 from 40423217 on Vimeo . Part2_小組協同零件繪製&Share; NFU_MDE_2017SpringCD_MidtermN3_40423217_Part2 from 40423217 on Vimeo . Part3_小組協同零件繪製&Share;，開始組立 NFU_MDE_2017SpringCD_MidtermN3_40423217_Part3.mp4 from 40423217 on Vimeo . Part4_小組協同組立 NFU_MDE_2017SpringCD_MidtermN3_40423217_Part4 from 40423217 on Vimeo . Part5_小組協同組立Share NFU_MDE_2017SpringCD_MidtermN3_40423217_Part5 from 40423217 on Vimeo . Part6_小組協同組立Share NFU_MDE_2017SpringCD_MidtermN3_40423217_Part6.mp4 from 40423217 on Vimeo ."},{"tags":"40423217","title":"Midterm_test_n2","url":"./midterm_test_n2.html","text":"使用py進行有效率的分組 Solvespace簡單四連趕機構---繪製 40423217_2017springcd_midterm_test_n2-1 from 40423217 on Vimeo . Solvespace簡單四連趕機構---TracePoint 40423217_2017springcd_midterm_test_n2-2 from 40423217 on Vimeo ."},{"tags":"40423217","title":"2017Spring_CD_W12","url":"./2017spring_cd_w12.html","text":"介紹課程大綱 本週起各組將進行期末協同實習專案規劃與執行，請各組在上課時段準備以 oral presentation text presentation theoretical presentation 逐步朝期末週 physical presentation 的目標邁進。 oral presentation： 口語說明進度、規劃細節、分工情形與問題討論等。 text presentation： 以 github pages 中的 blog 與 Fossil SCM 倉儲 wiki 紀錄每週專題執行情形， 並利用 github 與 Fossil SCM 倉儲管理所衍生的檔案。 theoretical presentation： 利用 Solvespace 、 Onshape 、 V-rep 與 Brython 進行各種系統評估模擬。 physical presentation： 在期末考週必須完成實體模型製作，並以 videos 展示各階段的準備工作與執行結果。"},{"tags":"40423217","title":"Week 3","url":"./week-3.html","text":"介紹課程大綱 本週起各組將進行期末協同實習專案規劃與執行，請各組在上課時段準備以 oral presentation text presentation theoretical presentation 逐步朝期末週 physical presentation 的目標邁進。 oral presentation： 口語說明進度、規劃細節、分工情形與問題討論等。 text presentation： 以 github pages 中的 blog 與 Fossil SCM 倉儲 wiki 紀錄每週專題執行情形， 並利用 github 與 Fossil SCM 倉儲管理所衍生的檔案。 theoretical presentation： 利用 Solvespace 、 Onshape 、 V-rep 與 Brython 進行各種系統評估模擬。 physical presentation： 在期末考週必須完成實體模型製作，並以 videos 展示各階段的準備工作與執行結果。"},{"tags":"40423217","title":"Solvespace&Onshape;四足機械獸 機械腿機構繪製","url":"./solvespaceonshapesi-zu-ji-jie-shou-ji-jie-tui-ji-gou-hui-zhi.html","text":"使用py進行有效率的分組 使用ethercalc製作簡易的分組表格 認識cp950(大五碼) 使用py建立分組程序，並且挑出未被分類的學生 製作簡易連桿組 了解vrep起始抓點，在做stl檔的時候原點需跟物件拉開一定距離 2017Spring_CD_week2_hw 繪圖介面 Onshape & Solvespace 繪圖介面 Solvespace Part1 Solvespace 四足機械獸 機械腿機構繪製_Part1大綱 Solvespace 簡單四連趕機構繪製_Part2組件\"曲柄\"繪製 Solvespace 簡單四連趕機構繪製_Part3組件\"浮桿\"繪製 Solvespace 簡單四連趕機構繪製_Part4組件\"搖桿\"繪製 Solvespace 簡單四連趕機構繪製_Part5組立 繪圖介面 Onshape Part2 Onshape 機械腿機構繪製_Part1大綱 2017-03-22_06-34-54 from 40423217 on Vimeo . Onshape 簡單四連趕機構繪製_Part2組件繪製_範例\"曲柄\" 2017-03-22_06-48-31 from 40423217 on Vimeo . Onshape 簡單四連趕機構繪製_Part3組件\"Pin\"繪製&組立(一) 2017-03-22_06-38-58 from 40423217 on Vimeo . Onshape 簡單四連趕機構繪製_Part3組件\"Pin\"繪製&組立(二) 2017-03-22_06-59-49 from 40423217 on Vimeo . 2017-03-22_07-01-59 from 40423217 on Vimeo . 2017-03-22_07-08-16 from 40423217 on Vimeo . 2017-03-22_07-12-37 from 40423217 on Vimeo . 2017-03-22_07-17-53 from 40423217 on Vimeo ."},{"tags":"40423217","title":"Solvespace&Onshape;簡單四連趕機構繪製","url":"./solvespaceonshapejian-dan-si-lian-gan-ji-gou-hui-zhi.html","text":"介紹課程大綱 了解Blender 3dstudio maya之相關性 stunnel 的使用 http的proxy 在py語言中,;(分號)=註解 簡略介紹c語言與py的優劣與使用時機 利用cmd輸出ipconfig /all 查詢ip後 至stunnel>config>stunnel.conf\\,利用Scite找到http字串修改其ip 進入例如https://192.168.1.24/2017springvcp_hw/index 的協同區域,並且嘗試以anonymous（無名氏/遊客）的身份進入 利用vrep配合Scite打開的ttt檔完成做動模擬 2017Spring_CD_week1_hw 繪圖介面 Onshape & Solvespace 繪圖介面 Solvespace Part1 Solvespace 簡單四連趕機構繪製_Part1大綱 2017-03-07_20-18-36 from 40423217 on Vimeo . Solvespace 簡單四連趕機構繪製_Part2組件\"曲柄\"繪製 2017-03-07_20-23-02 from 40423217 on Vimeo . Solvespace 簡單四連趕機構繪製_Part3組件\"浮桿\"繪製 2017-03-07_20-30-33 from 40423217 on Vimeo . Solvespace 簡單四連趕機構繪製_Part4組件\"搖桿\"繪製 2017-03-07_20-33-09 from 40423217 on Vimeo . Solvespace 簡單四連趕機構繪製_Part5組立 2017-03-21_22-41-15 from 40423217 on Vimeo . 繪圖介面 Onshape Part2 Onshape 簡單四連趕機構繪製_Part1大綱 2017-03-21_22-41-15 from 40423217 on Vimeo . Onshape 簡單四連趕機構繪製_Part2組件繪製_範例\"曲柄\" 2017-03-21_22-47-24 from 40423217 on Vimeo . Onshape 簡單四連趕機構繪製_Part3組件\"Pin\"繪製&組立(一) 2017-03-21_22-55-55 from 40423217 on Vimeo . Onshape 簡單四連趕機構繪製_Part3組件\"Pin\"繪製&組立(二) 2017-03-21_23-06-31 from 40423217 on Vimeo ."}]};