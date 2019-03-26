package com.axinsf.build;

import com.github.dockerjava.api.DockerClient;
import com.github.dockerjava.api.async.ResultCallback;
import com.github.dockerjava.api.model.BuildResponseItem;
import com.github.dockerjava.api.model.PushResponseItem;
import com.github.dockerjava.core.DefaultDockerClientConfig;
import com.github.dockerjava.core.DockerClientBuilder;
import com.github.dockerjava.core.command.BuildImageResultCallback;
import org.apache.commons.compress.archivers.tar.TarArchiveEntry;
import org.apache.commons.compress.archivers.tar.TarArchiveInputStream;
import org.apache.commons.compress.archivers.zip.ZipArchiveEntry;
import org.apache.commons.compress.archivers.zip.ZipFile;
import org.apache.commons.compress.compressors.gzip.GzipCompressorInputStream;
import org.apache.commons.io.FileUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.*;
import java.util.*;
import java.util.concurrent.CountDownLatch;
import java.util.zip.ZipEntry;

public class Build {

    static Logger logger = LoggerFactory.getLogger(Build.class);


    String DOCKER_HOST = "tcp://192.168.0.242:2376";
    String DOCKER_REG_URL = "registry.cn-shanghai.aliyuncs.com";
    String DOCKER_IMAGE_NAMESPACE = "axf-epay";
    String DOCKER_REG_USERNAME = "liumin@xiaofu";
    String DOCKER_REG_PASSWORD = "admin123";
    String DOCKER_REG_EMAIL = "liumin@axinfu.com";
    static String dockerDir;//docker工作目录

    boolean com = true;//是否推送到云端


    static Map<String, String> lx = new HashMap<>();
    static Map<String, String> rep = new HashMap<>();

    static {
        lx.put("1", "Dockerfile");

        rep.put("1","epay-web-tyfp");
    }

    static String dockerNum = "";

    /**
     * 打包时请修改版本号
     **/
    static String VERSION = "1.0.0.1";


    /**
     * 1. 将项目打包，并将打包后文件置于项目中的target文件夹下
     * 2. 执行main方法打包并上传至阿里云的镜像仓库
     *
     * @param args
     */
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.println("版本号为：[" + VERSION + "]");
//        String ver = sc.nextLine();
//        if (!ver.toLowerCase().equals("y")) {
//            System.out.println("停止任务，exit！");
//            return;
//        }
        System.out.println("请选择项目类型 ， 1(pc + mobile)");
        dockerNum = sc.nextLine();
        if (!lx.keySet().contains(dockerNum)) {
            System.out.println("输入错误，exit！");
            return;
        }
        Build build = new Build();
        BuildModel model = new BuildModel();
        model.repertoryName = rep.get(dockerNum);
        try {
            copyProject(dockerDir);

            build.build(model);
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            deleteAllFilesOfDir(new File(dockerDir));
        }
    }

    /**
     * 复制项目
     */
    public static void copyProject(String dest) {
        String path = System.getProperty("user.dir").replaceAll("\\\\", "/");
        path = path.substring(0, path.lastIndexOf("/"));

        if (dest == null || "".equals(dest)) {
            dest = System.getProperty("user.home") + "/build_cache";
            dockerDir = dest;
        }


        try {
            File work = new File(dest);
            if (work.exists())
                deleteAllFilesOfDir(work);

            //创建项目目录
            File dockerProject = new File(dest);
            dockerProject.mkdirs();


            File proDir = new File(dest, "c_tyfp");
            proDir.mkdirs();


            FilenameFilter filter = new FilenameFilter() {
                @Override
                public boolean accept(File dir, String name) {
                    if (name.equals("public") || name.equals("node_modules"))
                        return false;
                    else
                        return true;
                }
            };


            List<String> pathList = new ArrayList<>();
            pathList.add(path + "/c_tyfp/client");
            pathList.add(path + "/c_tyfp/server");
            pathList.add(path + "/c_tyfp/webpack");
            pathList.add(path + "/c_tyfp/favicon.png");
            pathList.add(path + "/c_tyfp/package.json");
            pathList.add(path + "/c_tyfp/.eslintrc");
            pathList.add(path + "/c_tyfp/.postcssrc.js");
            pathList.add(path + "/c_tyfp/.editorconfig");
            pathList.add(path + "/c_tyfp/.eslintignore");
            pathList.add(path + "/c_tyfp/.babelrc");
            pathList.add(path + "/c_tyfp/README.md");
            pathList.add(path + "/" + lx.get(dockerNum));


            for (String str : pathList) {
                File file = new File(str);
                if (file.isFile()) {
                    if (str.endsWith(lx.get(dockerNum)))
                        FileUtils.copyFileToDirectory(file, dockerProject);
                    else
                        FileUtils.copyFileToDirectory(file, proDir);
                } else if (file.isDirectory()) {
                    copyDir(file, proDir, filter);
                }
            }


        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    /**
     * 拷贝目录
     *
     * @param src
     * @param dest
     */
    private static void copyDir(File src, File dest, FilenameFilter filter) {
        try {
            if (!dest.exists()) {
                dest.mkdirs();
            }
            File tmp = new File(dest.getAbsolutePath(), src.getName());
            if (!tmp.exists())
                tmp.mkdirs();
            File[] files = src.listFiles(filter);
            for (File f : files) {
                if (f.isFile())
                    FileUtils.copyFileToDirectory(f, tmp);
                else if (f.isDirectory()) {
                    copyDir(f, tmp, filter);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    /**
     * 构建镜像并推送
     */
    public void build(BuildModel model) {
        try {
            File dockerFile = new File(dockerDir, lx.get(dockerNum));

            DefaultDockerClientConfig config = DefaultDockerClientConfig
                    .createDefaultConfigBuilder()
                    .withDockerHost(DOCKER_HOST)
                    .withRegistryUrl(DOCKER_REG_URL + "/" + DOCKER_IMAGE_NAMESPACE + "/" + model.repertoryName)
                    .withRegistryUsername(DOCKER_REG_USERNAME)
                    .withRegistryPassword(DOCKER_REG_PASSWORD)
                    .withRegistryEmail(DOCKER_REG_EMAIL)
                    .build();

            DockerClient client = DockerClientBuilder.getInstance(config).build();
            String imageName = DOCKER_REG_URL + "/" + DOCKER_IMAGE_NAMESPACE + "/" + model.repertoryName;

            String tag = imageName + ":" + VERSION;

            logger.info("镜像名称： " + imageName + ", 版本号： " + VERSION);
            String imageInfo = model.repertoryName + ":" + VERSION;
            CountDownLatch buildCountDownLatch = new CountDownLatch(1);

            BuildImageResultCallback callback = new BuildImageResultCallback() {
                public void onStart(Closeable closeable) {
                    logger.info("镜像 [" + imageInfo + "] 开始构建");
                }

                @Override
                public void onNext(BuildResponseItem item) {
                    if (item.getStream() != null) {
                        logger.info(item.getStream());
                    }
                }

                public void onError(Throwable throwable) {
                    logger.info("镜像 [" + imageInfo + "] 构建失败");
                    throwable.printStackTrace();
                    buildCountDownLatch.countDown();
                }

                public void onComplete() {
                    logger.info("镜像 [" + imageInfo + "] 构建成功");
                    buildCountDownLatch.countDown();
                }

                public void close() {

                }
            };

            client.buildImageCmd(dockerFile).withTag(tag).withNoCache(true).exec(callback);
            buildCountDownLatch.await();
            if (!com)
                return;
            //推送镜像

            CountDownLatch pushCountDownLatch = new CountDownLatch(1);
            client.pushImageCmd(imageName + ":" + VERSION).exec(new ResultCallback<PushResponseItem>() {
                public void onStart(Closeable closeable) {
                    logger.info("镜像 [" + imageInfo + "] 开始推送");
                }

                public void onNext(PushResponseItem object) {
                    if (object.getProgress() != null) {
                        logger.info(imageInfo + "  " + object.getProgress());
                    }
                }

                public void onError(Throwable throwable) {
                    logger.info("镜像 [" + imageInfo + "] 推送失败");
                    throwable.printStackTrace();
                    pushCountDownLatch.countDown();
                }

                public void onComplete() {
                    logger.info("镜像 [" + imageInfo + "] 推送成功");
                    pushCountDownLatch.countDown();
                }

                public void close() {

                }
            });
            pushCountDownLatch.await();

        } catch (Exception e) {
            e.printStackTrace();
            logger.info("镜像构建/推送失败！");

        }
    }


    /**
     * 删除文件夹
     *
     * @param file
     */
    public static void deleteAllFilesOfDir(File file) {
        if (!file.exists())
            return;
        if (file.isFile()) {
            file.delete();
            return;
        }
        File[] files = file.listFiles();
        for (File f : files) {
            deleteAllFilesOfDir(f);
        }
        file.delete();
    }

    static class BuildModel {
        String key;
        String port;
        String proPath;
        String repertoryName;
        String filePath;

        public BuildModel() {
        }
    }
}
