create database eu059m;
use eu059m;

CREATE TABLE `projects` (
  `no` int(6) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) not null,
  `notes` text ,
  `owner` int(11) not null,
  `created` timestamp NOT NULL,
  PRIMARY KEY (`no`),
  unique(`title`),
  FOREIGN KEY (owner) REFERENCES usr(uid) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

CREATE TABLE `buildings` (
  `no` int(11) NOT NULL,
  `p` int(11) NOT NULL ,
  `title` varchar(255) not null,
  `owner` int(11) not null,
  `created` timestamp NOT NULL,
  `notes` text ,
  PRIMARY KEY (`no`),
  unique(`p`,`title`),
  FOREIGN KEY (owner) REFERENCES usr(uid) ON DELETE CASCADE,
  FOREIGN KEY (p) REFERENCES projects(no) ON DELETE CASCADE,
  KEY `p` (`p`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `floors` (
  `no` int(11)NOT NULL,
  `p` int(11) NOT NULL,
  `b` int(11) NOT NULL,
  `owner` int(11)not null,
  `title` varchar(255)Not null,
  `created` timestamp NOT NULL,
  `notes` text,
  unique(`b`,`title`),
  FOREIGN KEY (owner) REFERENCES usr(uid) ON DELETE CASCADE,
  FOREIGN KEY (p) REFERENCES projects (no) ON DELETE CASCADE,
  FOREIGN KEY (b) REFERENCES buildings(no) ON DELETE CASCADE,
  PRIMARY KEY (`no`),
  KEY `p` (`p`,`b`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


CREATE TABLE `sheets` (
  `no` int(11) NOT NULL AUTO_INCREMENT,
  `p` int(11) NOT NULL,
  `b` int(11) NOT NULL,
  `f` int(11) NOT NULL,
  `u` int(11) NOT NULL,
  `dt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `TypeofMemberBeam` enum('f','on') NOT NULL DEFAULT 'f',
  `TypeofMemberColunm` enum('f','on') NOT NULL DEFAULT 'f',
  `TypeofMemberSlab` enum('f','on') NOT NULL DEFAULT 'f',
  `TypeofMemberStairs` enum('f','on') NOT NULL DEFAULT 'f',
  `TypeofMemberMansory` enum('f','on') NOT NULL DEFAULT 'f',
  `TypeofMemberRC` enum('f','on') NOT NULL DEFAULT 'f',
  `TypeofMemberFoundation` enum('f','on') NOT NULL DEFAULT 'f',
  `TypeofMemberOther` enum('f','on') NOT NULL DEFAULT 'f',
  `TypeofMemberOtherText` text,
  `location` POINT,
  `exposure_wetDry` enum('f','on') NOT NULL DEFAULT 'f',
  `exposure_chemical` enum('f','on') NOT NULL DEFAULT 'f',
  `exposure_erosion` enum('f','on') NOT NULL DEFAULT 'f',
  `exposure_elec` enum('f','on') NOT NULL DEFAULT 'f',
  `exposure_heat` enum('f','on') NOT NULL DEFAULT 'f',
  `LoadingCondition_Dead` enum('f','on') NOT NULL DEFAULT 'f',
  `LoadingCondition_Live` enum('f','on') NOT NULL DEFAULT 'f',
  `LoadingCondition_Impact` enum('f','on') NOT NULL DEFAULT 'f',
  `LoadingCondition_Vibration` enum('f','on') NOT NULL DEFAULT 'f',
  `LoadingCondition_Traffic` enum('f','on') NOT NULL DEFAULT 'f',
  `LoadingCondition_Seismic` enum('f','on') NOT NULL DEFAULT 'f',
  `LoadingCondition_Other` enum('f','on') NOT NULL DEFAULT 'f',
  `LoadingConditionOther` text,
  `GeneralCondition` enum('v1','v2','v3') DEFAULT NULL,
  `Distress_Cracking` enum('f','on') NOT NULL DEFAULT 'f',
  `Distress_Staining` enum('f','on') NOT NULL DEFAULT 'f',
  `Distress_Surface` enum('f','on') NOT NULL DEFAULT 'f',
  `Distress_Leaking` enum('f','on') NOT NULL DEFAULT 'f',
  `Cracking_Checking` enum('f','on') NOT NULL DEFAULT 'f',
  `Cracking_Craze` enum('f','on') NOT NULL DEFAULT 'f',
  `Cracking_D` enum('f','on') NOT NULL DEFAULT 'f',
  `Cracking_Diagnol` enum('f','on') NOT NULL DEFAULT 'f',
  `Cracking_Hairline` enum('f','on') NOT NULL DEFAULT 'f',
  `Cracking_Longitudinal` enum('f','on') NOT NULL DEFAULT 'f',
  `Cracking_Map` enum('f','on') NOT NULL DEFAULT 'f',
  `Cracking_Pattern` enum('f','on') NOT NULL DEFAULT 'f',
  `Cracking_Plastic` enum('f','on') NOT NULL DEFAULT 'f',
  `Cracking_Random` enum('f','on') NOT NULL DEFAULT 'f',
  `Cracking_Shrinkage` enum('f','on') NOT NULL DEFAULT 'f',
  `Cracking_Temperature` enum('f','on') NOT NULL DEFAULT 'f',
  `Cracking_Transverse` enum('f','on') NOT NULL DEFAULT 'f',
  `width` decimal(6,2) DEFAULT NULL,
  `Leaching` enum('f','on') NOT NULL DEFAULT 'f',
  `WorkingOrDormant` enum('v1','v2') DEFAULT NULL,
  `Textural_AirVoid` enum('f','on') NOT NULL DEFAULT 'f',
  `Textural_Blistering` enum('f','on') NOT NULL DEFAULT 'f',
  `Textural_Bugholes` enum('f','on') NOT NULL DEFAULT 'f',
  `Textural_ColdJoints` enum('f','on') NOT NULL DEFAULT 'f',
  `Textural_ColdLines` enum('f','on') NOT NULL DEFAULT 'f',
  `Textural_Discoloration` enum('f','on') NOT NULL DEFAULT 'f',
  `Textural_Honeycomb` enum('f','on') NOT NULL DEFAULT 'f',
  `Textural_Incrustation` enum('f','on') NOT NULL DEFAULT 'f',
  `Textural_Laitance` enum('f','on') NOT NULL DEFAULT 'f',
  `Textural_SandPocket` enum('f','on') NOT NULL DEFAULT 'f',
  `Textural_SandStreak` enum('f','on') NOT NULL DEFAULT 'f',
  `Textural_Segregation` enum('f','on') NOT NULL DEFAULT 'f',
  `Textural_Staining` enum('f','on') NOT NULL DEFAULT 'f',
  `Textural_Stalactite` enum('f','on') NOT NULL DEFAULT 'f',
  `Textural_Stalagmite` enum('f','on') NOT NULL DEFAULT 'f',
  `Textural_Stratification` enum('f','on') NOT NULL DEFAULT 'f',
  `Distresses_Chalking` enum('f','on') NOT NULL DEFAULT 'f',
  `Distresses_Deflection` enum('f','on') NOT NULL DEFAULT 'f',
  `Distresses_Delamination` enum('f','on') NOT NULL DEFAULT 'f',
  `Distresses_Distortion` enum('f','on') NOT NULL DEFAULT 'f',
  `Distresses_Dusting` enum('f','on') NOT NULL DEFAULT 'f',
  `Distresses_Exfoliation` enum('f','on') NOT NULL DEFAULT 'f',
  `Distresses_Leakage` enum('f','on') NOT NULL DEFAULT 'f',
  `Distresses_Peeling` enum('f','on') NOT NULL DEFAULT 'f',
  `Distresses_Warping` enum('f','on') NOT NULL DEFAULT 'f',
  `Distresses_Curling` enum('f','on') NOT NULL DEFAULT 'f',
  `Distresses_Deformation` enum('f','on') NOT NULL DEFAULT 'f',
  `Distresses_Disintegration` enum('f','on') NOT NULL DEFAULT 'f',
  `Distresses_DrummyArea` enum('f','on') NOT NULL DEFAULT 'f',
  `Distresses_Efflorescence` enum('f','on') NOT NULL DEFAULT 'f',
  `Distresses_Exudation` enum('f','on') NOT NULL DEFAULT 'f',
  `Distresses_MortarFlaking` enum('f','on') NOT NULL DEFAULT 'f',
  `Distresses_Pitting` enum('f','on') NOT NULL DEFAULT 'f',
  `JointDeficiencies` enum('f','on') NOT NULL DEFAULT 'f',
  `Spall` enum('f','on') NOT NULL DEFAULT 'f',
  `SealantFailure` enum('f','on') NOT NULL DEFAULT 'f',
  `Leakage` enum('f','on') NOT NULL DEFAULT 'f',
  `Fault` enum('f','on') NOT NULL DEFAULT 'f',
  `Popout` enum('f','on') NOT NULL DEFAULT 'f',
  `PopoutSize` enum('v1','v2','v3') DEFAULT NULL,
  `isScaling` enum('f','on') NOT NULL DEFAULT 'f',
  `Scaling` enum('v1','v2','v3','v4') DEFAULT NULL,
  `Exposed` enum('f','on') NOT NULL DEFAULT 'f',
  `Corroded` enum('f','on') NOT NULL DEFAULT 'f',
  `Snapped` enum('f','on') NOT NULL DEFAULT 'f',
  `isSpall` enum('f','on') NOT NULL DEFAULT 'f',
  `SpallSize` enum('v1','v2') DEFAULT NULL,
  `notes` text,
  `json` text,
  PRIMARY KEY (`no`),
  KEY `p` (`p`,`b`,`f`,`u`),
  KEY `u` (`u`,`p`,`no`),
  KEY `dt` (`dt`),
  KEY `p_2` (`p`,`TypeofMemberBeam`,`TypeofMemberColunm`,`b`),
  KEY `p_3` (`p`,`TypeofMemberSlab`,`TypeofMemberStairs`,`b`),
  KEY `p_4` (`p`,`TypeofMemberMansory`,`TypeofMemberRC`,`b`),
  KEY `p_5` (`p`,`TypeofMemberFoundation`,`b`),
  KEY `p_6` (`p`,`TypeofMemberOther`,`TypeofMemberOtherText`(200),`b`),
  KEY `p_7` (`p`,`location`(200),`b`),
  KEY `p_8` (`p`,`exposure_wetDry`,`exposure_chemical`,`b`),
  KEY `p_9` (`p`,`exposure_erosion`,`exposure_elec`,`b`),
  KEY `p_10` (`p`,`exposure_heat`,`b`),
  KEY `p_11` (`p`,`LoadingCondition_Dead`,`LoadingCondition_Live`,`b`),
  KEY `p_12` (`p`,`LoadingCondition_Impact`,`LoadingCondition_Vibration`,`b`),
  KEY `p_13` (`p`,`LoadingCondition_Traffic`,`LoadingCondition_Seismic`,`b`),
  KEY `p_14` (`p`,`LoadingCondition_Other`,`LoadingConditionOther`(200),`b`),
  KEY `p_15` (`p`,`GeneralCondition`,`b`),
  KEY `p_16` (`p`,`Distress_Cracking`,`Distress_Staining`,`b`),
  KEY `p_17` (`p`,`Distress_Surface`,`Distress_Leaking`,`b`),
  KEY `p_18` (`p`,`Cracking_Checking`,`Cracking_Craze`,`b`),
  KEY `p_19` (`p`,`Cracking_D`,`Cracking_Diagnol`,`b`),
  KEY `p_20` (`p`,`Cracking_Hairline`,`Cracking_Longitudinal`,`b`),
  KEY `p_21` (`p`,`Cracking_Map`,`Cracking_Pattern`,`b`),
  KEY `p_22` (`p`,`Cracking_Plastic`,`Cracking_Random`,`b`),
  KEY `p_23` (`p`,`Cracking_Shrinkage`,`Cracking_Temperature`,`b`),
  KEY `p_24` (`p`,`Cracking_Transverse`,`Leaching`,`b`),
  KEY `p_25` (`p`,`width`,`b`),
  KEY `p_26` (`p`,`WorkingOrDormant`,`b`),
  KEY `p_27` (`p`,`Textural_AirVoid`,`Textural_Blistering`,`Textural_ColdJoints`,`Textural_Discoloration`,`Textural_Incrustation`,`Textural_SandPocket`,`Textural_Segregation`,`Textural_Stalactite`,`Textural_Stratification`,`Textural_Bugholes`,`Textural_ColdLines`,`Textural_Honeycomb`,`Textural_Laitance`,`b`),
  KEY `p_28` (`p`,`Textural_Bugholes`,`Textural_ColdJoints`,`Textural_Stratification`,`Textural_Stalactite`,`Textural_Segregation`,`Textural_SandPocket`,`Textural_Incrustation`,`Textural_Discoloration`,`Textural_Stalagmite`,`Textural_Staining`,`Textural_SandStreak`,`Textural_Laitance`,`Textural_Honeycomb`,`b`),
  KEY `p_29` (`p`,`Textural_ColdLines`,`Textural_Discoloration`,`b`),
  KEY `p_30` (`p`,`Textural_Honeycomb`,`Textural_Incrustation`,`b`),
  KEY `p_31` (`p`,`Textural_Laitance`,`Textural_SandPocket`,`b`),
  KEY `p_32` (`p`,`Textural_SandStreak`,`Textural_Segregation`,`b`),
  KEY `p_33` (`p`,`Textural_Staining`,`Textural_Stalactite`,`b`),
  KEY `p_34` (`p`,`Textural_Stalagmite`,`Textural_Stratification`,`b`),
  KEY `p_35` (`p`,`Distresses_Chalking`,`Distresses_Deflection`,`b`),
  KEY `p_36` (`p`,`Distresses_Delamination`,`Distresses_Distortion`,`b`),
  KEY `p_37` (`p`,`Distresses_Dusting`,`Distresses_Exfoliation`,`b`),
  KEY `p_38` (`p`,`Distresses_Leakage`,`Distresses_Peeling`,`b`),
  KEY `p_39` (`p`,`Distresses_Warping`,`Distresses_Curling`,`b`),
  KEY `p_40` (`p`,`Distresses_Deformation`,`Distresses_Disintegration`,`b`),
  KEY `p_41` (`p`,`Distresses_DrummyArea`,`Distresses_Efflorescence`,`b`),
  KEY `p_42` (`p`,`Distresses_Exudation`,`Distresses_MortarFlaking`,`b`),
  KEY `p_43` (`p`,`Distresses_Pitting`,`b`),
  KEY `p_44` (`p`,`JointDeficiencies`,`Spall`,`SealantFailure`,`Leakage`,`Fault`,`b`),
  KEY `p_45` (`p`,`JointDeficiencies`,`SealantFailure`,`Fault`,`Leakage`,`Spall`,`b`),
  KEY `p_46` (`p`,`JointDeficiencies`,`Leakage`,`Fault`,`SealantFailure`,`Spall`,`b`),
  KEY `p_47` (`p`,`JointDeficiencies`,`Fault`,`Leakage`,`Spall`,`SealantFailure`,`b`),
  KEY `p_48` (`p`,`Popout`,`PopoutSize`,`b`),
  KEY `p_49` (`p`,`isScaling`,`Scaling`,`b`),
  KEY `p_50` (`p`,`Exposed`,`Corroded`,`Snapped`,`b`),
  KEY `p_51` (`p`,`Corroded`,`Snapped`,`Exposed`,`b`),
  KEY `p_52` (`p`,`Snapped`,`Corroded`,`Exposed`,`b`),
  KEY `p_53` (`p`,`isSpall`,`SpallSize`,`b`),
  KEY `p_54` (`p`,`notes`(200),`b`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- should show in tinymce, in sheet screen, one field at a time if the user (selects) a field. in help-mode of the sheet gui 
CREATE TABLE `help` (
  `no` int(11) NOT NULL AUTO_INCREMENT,
	`field` varchar(255),--this should be enum , and each field in sheets would be the enum item
	`html` text,
  `lastModified` timestamp NOT NULL,
  PRIMARY KEY (`no`),
  unique (`field`),
  KEY `lastModified` (`lastModified`,`path`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

CREATE TABLE `ssn` (
  `sid` int(6) NOT NULL AUTO_INCREMENT,
  `uid` int(6) NOT NULL,
  `dt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `auth` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `last` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`sid`),
  KEY `kDt` (`dt`),
  KEY `kAuth` (`auth`),
  KEY `kLast` (`last`)
) ENGINE=MyISAM AUTO_INCREMENT=210 DEFAULT CHARSET=utf8;


--storage table is for js-localStorage, indirectly for "client-side generated gui", but as for scafolding NO gui
CREATE TABLE `storage` (
  `no` int(11) NOT NULL AUTO_INCREMENT,
  `path` varchar(255) NOT NULL,
  `data` mediumtext NOT NULL,
  `contentType` varchar(255) NOT NULL,
  `lastModified` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`no`),
  KEY `path` (`path`,`lastModified`),
  KEY `lastModified` (`lastModified`,`path`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;


CREATE TABLE `usr` (
  `uid` int(11) NOT NULL,
  `un` varchar(255) DEFAULT NULL,
  `pw` varchar(255) DEFAULT NULL,
  ---`json` json NOT NULL,
  `firstName` varchar(255),
  `lastName` varchar(255),
  `email` varchar(255),
  `tel` varchar(255),
  `tel2` varchar(255),
  `notes` text,
  `level` enum('viewer','inspector','full') not null default 'viewer',
  PRIMARY KEY (`uid`),
  unique(`un`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


CREATE TABLE `log` (
  `no` int(24) NOT NULL AUTO_INCREMENT,
  `dt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `uid` int(11) NOT NULL,
  `entity` enum('projects','usr','sheets','imgs','ssn','log','buildings','floors','storage','help','config') DEFAULT NULL,
  `pk` int(11) DEFAULT NULL,
  `act` enum('New','Update','Delete','Login','Logout','Log','Error') DEFAULT NULL,
  `json` text,
  PRIMARY KEY (`no`),
  KEY `uid` (`uid`,`dt`),
  KEY `dt` (`dt`),
  KEY `entity` (`entity`,`act`,`dt`),
  KEY `entity_2` (`entity`,`pk`,`dt`)
) ENGINE=InnoDB AUTO_INCREMENT=256 DEFAULT CHARSET=utf8;
