cmd_Release/qlz.node := ln -f "Release/obj.target/qlz.node" "Release/qlz.node" 2>/dev/null || (rm -rf "Release/qlz.node" && cp -af "Release/obj.target/qlz.node" "Release/qlz.node")
