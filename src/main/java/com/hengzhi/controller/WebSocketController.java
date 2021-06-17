package com.hengzhi.controller;

import com.hengzhi.utils.ApplicationContextRegister;
import org.springframework.context.ApplicationContext;
import net.sf.json.JSONObject;
import javax.websocket.*;
import javax.websocket.server.PathParam;
import javax.websocket.server.ServerEndpoint;
import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.concurrent.ConcurrentHashMap;

@ServerEndpoint("/websocket/{info}")
public class WebSocketController {
    ApplicationContext act = ApplicationContextRegister.getApplicationContext();
    UserController userController = act.getBean(UserController.class);
    private static SimpleDateFormat df = new SimpleDateFormat("HH:mm:ss");//创建时间格式对象
    //concurrent包的线程安全Set，用来存放每个客户端对应的WebSocketController对象。
    //创建一个房间的集合，用来存放房间
    private static ConcurrentHashMap<String, ConcurrentHashMap<String, WebSocketController>> roomList = new ConcurrentHashMap<String, ConcurrentHashMap<String, WebSocketController>>();
    //与某个客户端的连接会话，需要通过它来给客户端发送数据
    private Session session;

   /*static {
        roomList.put("room1", new ConcurrentHashMap<String, WebSocketController>());
        roomList.put("room2", new ConcurrentHashMap<String, WebSocketController>());
    }*/

    /**
     * 用户接入
     *
     * @param param   连接websocket服务器时穿的参数
     * @param session 会话
     */
    @OnOpen
    public void onOpen(@PathParam(value = "info") String param, Session session) throws IOException {
        this.session = session;
        String flag = param.split("[|]")[0];//标识
        String room = null, userId = null;
        room = param.split("[|]")[1];      //成员名
        userId = param.split("[|]")[2]; //截取用户名
        //判断标志位是不是加入房间

        if (flag.equals("join")) {
            //调用加入房间的方法，传入房间名称和用户名称
            try {
                JSONObject jsonObject=JSONObject.fromObject(joinRoom(room, userId));

                String msg = jsonObject.toString();
                System.out.println("msg是" + msg);
                ConcurrentHashMap<String, WebSocketController> e = roomList.get(room);
                for (String m : e.keySet()) {
                    e.get(m).sendMessage(msg);
                }

            } catch (EncodeException e) {
                System.out.println(e);
                e.printStackTrace();
            }
        }

    }

    /**
     * 加入房间
     *
     * @param room   房间号
     * @param userId 用户名
     */
    public HashMap joinRoom(String room, String userId) throws IOException, EncodeException {
        //从房间列表中获取房间
        HashMap map=new HashMap();
        return map;

    }

    /**
     * 发送消息的方法
     *
     * @param message 需要发送的消息
     * @throws IOException
     */
    public void sendMessage(String message) throws IOException {
        this.session.getBasicRemote().sendText(message);
    }



    /**
     * 接收到来自用户的消息
     *
     * @param message 接受的消息
     * @param session 回话
     * @throws IOException
     */
    @OnMessage
    public void onMessage(String message, Session session) throws IOException, ParseException, EncodeException {
        //把用户发来的消息解析为JSON对象
        JSONObject obj = JSONObject.fromObject(message);
        System.out.println("obj是" + obj.toString());
        String flag = obj.get("flag").toString();
        System.out.println("flag" + flag);
        HashMap obj1=new HashMap();

    }

    /**
     * 用户断开
     *
     * @param session
     */
    @OnClose
    public void onClose(Session session) {
        System.out.println("退出聊天室");


    }

    /**
     * 用户连接异常
     *
     * @param t
     */
    @OnError
    public void onError(Throwable t) {

    }
}